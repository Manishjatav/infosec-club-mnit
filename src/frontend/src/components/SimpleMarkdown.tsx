interface SimpleMarkdownProps {
  children: string;
  className?: string;
}

export default function SimpleMarkdown({
  children,
  className = "",
}: SimpleMarkdownProps) {
  const lines = children.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;
  let codeBlock: string[] = [];
  let inCode = false;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith("```")) {
      if (inCode) {
        elements.push(
          <pre
            key={`code-${i}`}
            className="bg-cyber-elevated border border-white/10 rounded-xl p-4 overflow-x-auto my-4"
          >
            <code className="text-neon-green font-mono text-sm">
              {codeBlock.join("\n")}
            </code>
          </pre>,
        );
        codeBlock = [];
        inCode = false;
      } else {
        inCode = true;
      }
      i++;
      continue;
    }

    if (inCode) {
      codeBlock.push(line);
      i++;
      continue;
    }

    if (line.startsWith("### ")) {
      elements.push(
        <h3
          key={`h3-${i}`}
          className="text-lg font-bold mt-6 mb-2 text-foreground"
        >
          {line.slice(4)}
        </h3>,
      );
    } else if (line.startsWith("## ")) {
      elements.push(
        <h2
          key={`h2-${i}`}
          className="text-xl font-bold mt-8 mb-3 text-foreground border-b border-white/10 pb-2"
        >
          {line.slice(3)}
        </h2>,
      );
    } else if (line.startsWith("# ")) {
      elements.push(
        <h1
          key={`h1-${i}`}
          className="text-2xl font-bold mt-6 mb-4 text-foreground"
        >
          {line.slice(2)}
        </h1>,
      );
    } else if (line.startsWith("- ") || line.startsWith("* ")) {
      elements.push(
        <li
          key={`li-${i}`}
          className="text-muted-foreground mb-1 ml-4 list-disc"
        >
          {formatInline(line.slice(2))}
        </li>,
      );
    } else if (/^\d+\.\s/.test(line)) {
      elements.push(
        <li
          key={`oli-${i}`}
          className="text-muted-foreground mb-1 ml-4 list-decimal"
        >
          {formatInline(line.replace(/^\d+\.\s/, ""))}
        </li>,
      );
    } else if (line.startsWith(">")) {
      elements.push(
        <blockquote
          key={`bq-${i}`}
          className="border-l-2 border-neon-green pl-4 italic text-muted-foreground my-2"
        >
          {line.slice(2)}
        </blockquote>,
      );
    } else if (line.trim() === "") {
      elements.push(<div key={`sp-${i}`} className="h-3" />);
    } else {
      elements.push(
        <p
          key={`p-${i}`}
          className="text-muted-foreground leading-relaxed mb-3"
        >
          {formatInline(line)}
        </p>,
      );
    }
    i++;
  }

  return <div className={className}>{elements}</div>;
}

function formatInline(text: string): React.ReactNode[] {
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return parts.map((part) => {
    const key = part.slice(0, 12);
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={key} className="text-foreground font-semibold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return (
        <em key={key} className="italic">
          {part.slice(1, -1)}
        </em>
      );
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={key}
          className="text-neon-green bg-white/5 px-1 py-0.5 rounded text-sm font-mono"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return <span key={key}>{part}</span>;
  });
}
