import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username");

  if (!username) {
    return NextResponse.json({ error: "username 파라미터가 필요합니다." }, { status: 400 });
  }

  try {
    const res = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100&sort=updated`, {
      headers: {
        "User-Agent": "Portfolio-Builder-Agent",
        "Accept": "application/vnd.github.v3+json",
      },
      next: { revalidate: 60 } // 1분 캐싱
    });

    if (!res.ok) {
      if (res.status === 404) {
        return NextResponse.json({ error: "존재하지 않는 GitHub 사용자입니다." }, { status: 404 });
      }
      return NextResponse.json({ error: `GitHub API 오류: ${res.statusText}` }, { status: res.status });
    }

    const repos = await res.json();
    const formatted = repos.map((repo: any) => ({
      name: repo.name,
      fullName: repo.full_name,
      description: repo.description || "설명이 등록되지 않은 레포지토리입니다.",
      htmlUrl: repo.html_url,
      language: repo.language,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      updatedAt: repo.updated_at,
      homepage: repo.homepage,
      fork: repo.fork,
    }));

    return NextResponse.json({ repos: formatted });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "서버 내부 오류가 발생했습니다." }, { status: 500 });
  }
}
