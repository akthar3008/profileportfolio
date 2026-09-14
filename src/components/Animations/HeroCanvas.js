import React, { useState, useEffect, useRef } from 'react';

const fullCodeScript = [
  "import React, { useState, useEffect } from 'react';",
  "import { motion } from 'framer-motion';",
  "import * as THREE from 'three';",
  "",
  "// Full Stack Developer Core Architecture",
  "export const Experience = ({ dev = 'Z.Mohammed.Akthar' }) => {",
  "  const [status, setStatus] = useState('Online & Ready');",
  "  const [metrics, setMetrics] = useState({ uptime: '99.99%', ping: '12ms' });",
  "  const stack = ['React', 'Node.js', 'MongoDB', 'Three.js', 'Tailwind'];",
  "",
  "  useEffect(() => {",
  "    console.log('[SYS]: Core services active for ' + dev);",
  "  }, [dev]);",
  "",
  "  return (",
  "    <motion.main className='workspace' initial={{ opacity: 0 }}>",
  "      <WorkspaceCanvas status={status} metrics={metrics} />",
  "      <NavigationTray technologies={stack} />",
  "    </motion.main>",
  "  );",
  "};",
  "export default Experience;"
];

export default function HeroCanvas() {
  const [progress, setProgress] = useState({ line: 11, char: 0 });
  const codeBodyRef = useRef(null);

  // Deterministic Typewriter Streamer - Zero array holes
  useEffect(() => {
    const { line, char } = progress;

    if (line >= fullCodeScript.length) {
      const loopTimer = setTimeout(() => {
        setProgress({ line: 5, char: 0 });
      }, 5000);
      return () => clearTimeout(loopTimer);
    }

    const currentTarget = fullCodeScript[line] || '';

    if (char < currentTarget.length) {
      const charTimer = setTimeout(() => {
        setProgress((prev) => ({ ...prev, char: prev.char + 1 }));
      }, 22);
      return () => clearTimeout(charTimer);
    } else {
      const lineTimer = setTimeout(() => {
        setProgress((prev) => ({ line: prev.line + 1, char: 0 }));
      }, 75);
      return () => clearTimeout(lineTimer);
    }
  }, [progress]);

  useEffect(() => {
    if (codeBodyRef.current) {
      codeBodyRef.current.scrollTop = codeBodyRef.current.scrollHeight;
    }
  }, [progress.line]);

  // Safely construct visible lines
  const completedLines = fullCodeScript.slice(0, progress.line);
  const activeLine = (fullCodeScript[progress.line] || '').slice(0, progress.char);
  const visibleLines = progress.line < fullCodeScript.length
    ? [...completedLines, activeLine]
    : completedLines;

  return (
    <div className="laptop-perspective-wrap">
      {/* Top Floating Badge */}
      <div className="floating-glass-tag tag-top">
        💡 <strong>Ideas</strong> · Design · Develop · Deploy
      </div>

      {/* Responsive Laptop Chassis */}
      <div className="laptop-cross-chassis">
        {/* Screen Lid */}
        <div className="laptop-screen-lid">
          <div className="laptop-webcam-notch">
            <span className="camera-lens"></span>
          </div>

          <div className="screen-glass-glare"></div>

          <div className="screen-editor-surface">
            {/* macOS Titlebar */}
            <div className="mac-titlebar">
              <div className="mac-buttons">
                <span className="mac-btn close"></span>
                <span className="mac-btn minimize"></span>
                <span className="mac-btn zoom"></span>
              </div>
              <div className="mac-file-tab">
                <span className="file-icon">⚛</span>
                <span className="file-name">Experience.jsx</span>
                <span className="dirty-dot">●</span>
              </div>
              <div className="mac-env-pill">Z.Mohammed.Akthar · MERN</div>
            </div>

            {/* Code Body with Null-Safe Syntax Highlighting */}
            <div className="mac-code-body" ref={codeBodyRef}>
              {visibleLines.map((rawLine, idx) => {
                const line = typeof rawLine === 'string' ? rawLine : '';
                let syntaxType = 'text-default';

                if (line.startsWith('import') || line.startsWith('export') || line.startsWith('return')) {
                  syntaxType = 'text-keyword';
                } else if (line.startsWith('//')) {
                  syntaxType = 'text-comment';
                } else if (line.includes('const') || line.includes('useState') || line.includes('useEffect')) {
                  syntaxType = 'text-function';
                } else if (line.includes('<') || line.includes('/>')) {
                  syntaxType = 'text-tag';
                }

                return (
                  <div className="code-row" key={idx}>
                    <span className="row-number">{idx + 1}</span>
                    <span className={`row-code ${syntaxType}`}>{line || '\u00A0'}</span>
                  </div>
                );
              })}
              <div className="code-cursor-line">
                <span className="row-number">{visibleLines.length + 1}</span>
                <span className="blinking-cursor">|</span>
              </div>
            </div>

            {/* Status Bar */}
            <div className="mac-statusbar">
              <span>⚡ UTF-8</span>
              <span>JavaScript JSX</span>
              <span>Spaces: 2</span>
              <span className="status-live">● LIVE</span>
            </div>
          </div>
        </div>

        {/* Hinge & Lower Keyboard Base */}
        <div className="laptop-hinge"></div>

        <div className="laptop-keyboard-base">
          <div className="laptop-base-notch"></div>
          <div className="laptop-keyboard-deck">
            <div className="key-row row-f"></div>
            <div className="key-row"></div>
            <div className="key-row"></div>
            <div className="key-row"></div>
            <div className="key-row row-space"></div>
          </div>
          <div className="laptop-trackpad"></div>
        </div>

        <div className="laptop-desk-shadow"></div>
      </div>

      {/* Bottom Floating Badge */}
      <div className="floating-glass-tag tag-bottom">
        ✨ <strong>Clean Code</strong> · Better Web · Brighter Future
      </div>
    </div>
  );
}