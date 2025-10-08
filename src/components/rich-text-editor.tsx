'use client';

import { useState, useRef, useEffect } from 'react';
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, AlignJustify, List, ListOrdered } from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({ value, onChange, placeholder = "Écrivez votre description..." }: RichTextEditorProps) {
  const [fontSize, setFontSize] = useState<string>('14');
  const [fontFamily, setFontFamily] = useState<string>('Arial');
  const editorRef = useRef<HTMLDivElement>(null);

  const fonts: string[] = ['Arial', 'Times New Roman', 'Georgia', 'Verdana', 'Courier New'];
  const fontSizes: string[] = ['10', '12', '14', '16', '18', '20', '24'];

  useEffect(() => {
    if (editorRef.current && value !== editorRef.current.innerHTML) {
      editorRef.current.innerHTML = value || '';
    }
  }, [value]);

  const execCommand = (command: string, val: string | null = null): void => {
    document.execCommand(command, false, val ?? undefined);
    editorRef.current?.focus();
    handleInput();
  };

  const applyFontSize = (size: string): void => {
    setFontSize(size);
    execCommand('fontSize', '7');
    const fontElements = editorRef.current?.querySelectorAll('font[size="7"]');
    fontElements?.forEach(element => {
      element.removeAttribute('size');
      (element as HTMLElement).style.fontSize = `${size}px`;
    });
  };

  const applyFontFamily = (font: string): void => {
    setFontFamily(font);
    execCommand('fontName', font);
  };

  const handleInput = (): void => {
    if (editorRef.current && onChange) {
      onChange(editorRef.current.innerHTML);
    }
  };

  return (
    <div className="border border-gray-200 rounded-md overflow-hidden">
      {/* Toolbar */}
      <div className="border-b border-gray-200 p-2 bg-gray-50 flex flex-wrap gap-1 items-center">
        {/* Font Family */}
        <select
          value={fontFamily}
          onChange={(e) => applyFontFamily(e.target.value)}
          className="px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {fonts.map(font => (
            <option key={font} value={font}>{font}</option>
          ))}
        </select>

        {/* Font Size */}
        <select
          value={fontSize}
          onChange={(e) => applyFontSize(e.target.value)}
          className="px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {fontSizes.map(size => (
            <option key={size} value={size}>{size}pt</option>
          ))}
        </select>

        <div className="w-px h-5 bg-gray-300 mx-1"></div>

        {/* Text Formatting */}
        <button
          type="button"
          onClick={() => execCommand('bold')}
          className="p-1.5 hover:bg-gray-200 rounded transition-colors"
          title="Gras"
        >
          <Bold className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={() => execCommand('italic')}
          className="p-1.5 hover:bg-gray-200 rounded transition-colors"
          title="Italique"
        >
          <Italic className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={() => execCommand('underline')}
          className="p-1.5 hover:bg-gray-200 rounded transition-colors"
          title="Souligné"
        >
          <Underline className="h-4 w-4" />
        </button>

        <div className="w-px h-5 bg-gray-300 mx-1"></div>

        {/* Alignment */}
        <button
          type="button"
          onClick={() => execCommand('justifyLeft')}
          className="p-1.5 hover:bg-gray-200 rounded transition-colors"
          title="Aligner à gauche"
        >
          <AlignLeft className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={() => execCommand('justifyCenter')}
          className="p-1.5 hover:bg-gray-200 rounded transition-colors"
          title="Centrer"
        >
          <AlignCenter className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={() => execCommand('justifyRight')}
          className="p-1.5 hover:bg-gray-200 rounded transition-colors"
          title="Aligner à droite"
        >
          <AlignRight className="h-4 w-4" />
        </button>

        <div className="w-px h-5 bg-gray-300 mx-1"></div>

        {/* Lists */}
        <button
          type="button"
          onClick={() => execCommand('insertUnorderedList')}
          className="p-1.5 hover:bg-gray-200 rounded transition-colors"
          title="Liste à puces"
        >
          <List className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={() => execCommand('insertOrderedList')}
          className="p-1.5 hover:bg-gray-200 rounded transition-colors"
          title="Liste numérotée"
        >
          <ListOrdered className="h-4 w-4" />
        </button>

        <div className="w-px h-5 bg-gray-300 mx-1"></div>

        {/* Colors */}
        <input
          type="color"
          onChange={(e) => execCommand('foreColor', e.target.value)}
          className="w-6 h-6 rounded cursor-pointer"
          title="Couleur du texte"
        />

        <input
          type="color"
          onChange={(e) => execCommand('hiliteColor', e.target.value)}
          className="w-6 h-6 rounded cursor-pointer"
          title="Surbrillance"
        />
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        className="min-h-[150px] max-h-[300px] overflow-y-auto p-3 focus:outline-none text-sm"
        style={{
          fontFamily: fontFamily,
          fontSize: `${fontSize}px`
        }}
        data-placeholder={placeholder}
        suppressContentEditableWarning
      />
      
      <style>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
        }
      `}</style>
    </div>
  );
}