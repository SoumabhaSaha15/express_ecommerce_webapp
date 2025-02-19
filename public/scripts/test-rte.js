import Editor from './../bundle/tiptap/core/editor.js';
import StarterKit from './../bundle/tiptap/starter-kit.js';
import Highlight from './../bundle/tiptap/extension/highlight.js';
import Underline from './../bundle/tiptap/extension/underline.js';
import Link from './../bundle/tiptap/extension/link.js';
import TextStyle from './../bundle/tiptap/extension/text-style.js';
import TextAlign from './../bundle/tiptap/extension/text-align.js';
import Image from './../bundle/tiptap/extension/image.js';
import YouTube from './../bundle/tiptap/extension/youtube.js';
import Color from './../bundle/tiptap/extension/color.js';
import FontFamily from './../bundle/tiptap/extension/font-family.js';
import Bold from './../bundle/tiptap/extension/bold.js';

window.addEventListener('load', function () {
  if (document.getElementById("wysiwyg-example")) {
    const FontSizeTextStyle = TextStyle.extend({
      addAttributes() {
        return {
          fontSize: {
            default: null,
            parseHTML: element => element.style.fontSize,
            renderHTML: attributes => {
              if (!attributes.fontSize) {
                return {};
              }
              return { style: 'font-size: ' + attributes.fontSize };
            },
          },
        };
      },
    });
    const CustomBold = Bold.extend({
      renderHTML({ mark, HTMLAttributes }) {
        const { style, ...rest } = HTMLAttributes;
        const newStyle = 'font-weight: bold;' + (style ? ' ' + style : '');
        return ['span', { ...rest, style: newStyle.trim() }, 0];
      },
      addOptions() {
        return {
          ...this.parent?.(),
          HTMLAttributes: {},
        };
      },
    });
    const editor = new Editor({
      element: document.querySelector('#wysiwyg-example'),
      extensions: [
        StarterKit.configure({
          textStyle: false,
          bold: false,
          marks: {
            bold: false,
          },
        }),
        CustomBold,
        Color,
        FontSizeTextStyle,
        FontFamily,
        Highlight,
        Underline,
        Link.configure({
          openOnClick: false,
          autolink: true,
          defaultProtocol: 'https',
        }),
        TextAlign.configure({
          types: ['heading', 'paragraph'],
        }),
        Image,
        YouTube,
      ],
      content: '<p>Learn more about all components from the <a href="https://flowbite.com/docs/getting-started/introduction/">Flowbite Docs</a>.</p>',
      editorProps: {
        attributes: {
          class: 'format lg:format-lg dark:format-invert focus:outline-none format-blue max-w-none',
        },
      }
    });
    document.getElementById('toggleBoldButton').addEventListener('click', () => editor.chain().focus().toggleBold().run());
    document.getElementById('toggleItalicButton').addEventListener('click', () => editor.chain().focus().toggleItalic().run());
    document.getElementById('toggleUnderlineButton').addEventListener('click', () => editor.chain().focus().toggleUnderline().run());
    document.getElementById('toggleStrikeButton').addEventListener('click', () => editor.chain().focus().toggleStrike().run());
    document.getElementById('toggleHighlightButton').addEventListener('click', () => {
      const isHighlighted = editor.isActive('highlight');
      editor.chain().focus().toggleHighlight({
        color: isHighlighted ? undefined : '#ffc078' // if is already highlighted，unset the highlight color
      }).run();
    });
    document.getElementById('toggleLinkButton').addEventListener('click', () => {
      const url = window.prompt('Enter image URL:', 'https://flowbite.com');
      editor.chain().focus().toggleLink({ href: url }).run();
    });
    document.getElementById('removeLinkButton').addEventListener('click', () => {
      editor.chain().focus().unsetLink().run()
    });
    document.getElementById('toggleCodeButton').addEventListener('click', () => {
      editor.chain().focus().toggleCode().run();
    })
    document.getElementById('toggleLeftAlignButton').addEventListener('click', () => {
      editor.chain().focus().setTextAlign('left').run();
    });
    document.getElementById('toggleCenterAlignButton').addEventListener('click', () => {
      editor.chain().focus().setTextAlign('center').run();
    });
    document.getElementById('toggleRightAlignButton').addEventListener('click', () => {
      editor.chain().focus().setTextAlign('right').run();
    });
    document.getElementById('toggleListButton').addEventListener('click', () => {
      editor.chain().focus().toggleBulletList().run();
    });
    document.getElementById('toggleOrderedListButton').addEventListener('click', () => {
      editor.chain().focus().toggleOrderedList().run();
    });
    document.getElementById('toggleBlockquoteButton').addEventListener('click', () => {
      editor.chain().focus().toggleBlockquote().run();
    });
    document.getElementById('toggleHRButton').addEventListener('click', () => {
      editor.chain().focus().setHorizontalRule().run();
    });
    document.getElementById('addImageButton').addEventListener('click', () => {
      const url = window.prompt('Enter image URL:', 'https://placehold.co/600x400');
      if (url) {
        editor.chain().focus().setImage({ src: url }).run();
      }
    });
    document.getElementById('addVideoButton').addEventListener('click', () => {
      const url = window.prompt('Enter YouTube URL:', 'https://www.youtube.com/watch?v=KaLxCiilHns');
      if (url) {
        editor.commands.setYoutubeVideo({
          src: url,
          width: 640,
          height: 480,
        })
      }
    });
    const typographyDropdown = FlowbiteInstances.getInstance('Dropdown', 'typographyDropdown');
    document.getElementById('toggleParagraphButton').addEventListener('click', () => {
      editor.chain().focus().setParagraph().run();
      typographyDropdown.hide();
    });
    document.querySelectorAll('[data-heading-level]').forEach((button) => {
      button.addEventListener('click', () => {
        const level = button.getAttribute('data-heading-level');
        editor.chain().focus().toggleHeading({ level: parseInt(level) }).run()
        typographyDropdown.hide();
      });
    });
    const textSizeDropdown = FlowbiteInstances.getInstance('Dropdown', 'textSizeDropdown');
    document.querySelectorAll('[data-text-size]').forEach((button) => {
      button.addEventListener('click', () => {
        const fontSize = button.getAttribute('data-text-size');
        editor.chain().focus().setMark('textStyle', { fontSize }).run();
        textSizeDropdown.hide();
      });
    });
    const colorPicker = document.getElementById('color');
    colorPicker.addEventListener('input', (event) => {
      const selectedColor = event.target.value;
      editor.chain().focus().setColor(selectedColor).run();
    })
    document.querySelectorAll('[data-hex-color]').forEach((button) => {
      button.addEventListener('click', () => {
        const selectedColor = button.getAttribute('data-hex-color');
        editor.chain().focus().setColor(selectedColor).run();
      });
    });
    document.getElementById('reset-color').addEventListener('click', () => {
      editor.commands.unsetColor();
    })
    const fontFamilyDropdown = FlowbiteInstances.getInstance('Dropdown', 'fontFamilyDropdown');
    document.querySelectorAll('[data-font-family]').forEach((button) => {
      button.addEventListener('click', () => {
        const fontFamily = button.getAttribute('data-font-family');
        editor.chain().focus().setFontFamily(fontFamily).run();
        fontFamilyDropdown.hide();
      });
    });
  }
});
