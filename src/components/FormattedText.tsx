import React from "react";

// 인라인 마크다운 (**볼드**, `코드`) 파싱 함수
export function renderInlineMarkdown(text: string): React.ReactNode {
  if (!text) return null;
  // 정규식으로 **볼드**와 `코드` 분리
  const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g);

  return parts.map((part, idx) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={idx} className="font-bold text-slate-900">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={idx}
          className="bg-emerald-50 text-emerald-800 px-1.5 py-0.5 rounded text-xs font-mono border border-emerald-200/70"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}

// 여러 줄과 불릿이 섞인 텍스트를 줄바꿈 및 리스트로 깔끔하게 렌더링
export default function FormattedText({
  content,
  className = "",
}: {
  content: string;
  className?: string;
}) {
  if (!content) return null;

  // 줄 단위 분리
  const lines = content.split(/\r?\n/).filter((l) => l.trim().length > 0);

  return (
    <div className={`space-y-3 ${className}`}>
      {lines.map((line, idx) => {
        const trimmed = line.trim();

        // 불릿 포인트 형태인 경우 (- 항목, * 항목)
        if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
          const itemText = trimmed.replace(/^[-*]\s+/, "");
          return (
            <div key={idx} className="flex items-start gap-2.5 pl-1 text-slate-700">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-700 mt-2 shrink-0" />
              <div className="leading-relaxed flex-1">
                {renderInlineMarkdown(itemText)}
              </div>
            </div>
          );
        }

        // 일반 문단인 경우
        return (
          <p key={idx} className="leading-relaxed text-slate-700">
            {renderInlineMarkdown(trimmed)}
          </p>
        );
      })}
    </div>
  );
}
