import { NextResponse } from 'next/server';

export async function POST() {
    const token = process.env.GITHUB_TOKEN;
    const owner = process.env.GITHUB_OWNER;
    const repo = process.env.GITHUB_REPO;
    const base = process.env.GITHUB_BRANCH_MAIN || 'main';
    const head = process.env.GITHUB_BRANCH_DRAFT || 'drafts';

    if (!token || !owner || !repo) {
        return NextResponse.json(
            { message: 'Missing GitHub configuration (token, owner, or repo)' },
            { status: 500 }
        );
    }

    try {
        const response = await fetch(
            `https://api.github.com/repos/${owner}/${repo}/merges`,
            {
                method: 'POST',
                headers: {
                    Authorization: `token ${token}`,
                    Accept: 'application/vnd.github.v3+json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    base,
                    head,
                    commit_message: 'Publish changes from TinaCMS drafts',
                }),
            }
        );

        const data = await response.json();

        if (response.ok) {
            return NextResponse.json({ message: 'Success', data });
        } else {
            // GitHub returns 204 if there's nothing to merge
            if (response.status === 204) {
                return NextResponse.json({ message: 'Nothing to publish (branches are already in sync)' });
            }
            return NextResponse.json(
                { message: data.message || 'Error merging branches' },
                { status: response.status }
            );
        }
    } catch (error) {
        console.error('Publish error:', error);
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}
