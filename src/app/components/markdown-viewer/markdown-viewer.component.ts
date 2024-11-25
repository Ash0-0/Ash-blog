// import { Component, Input, OnChanges } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { marked } from 'marked';
// import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
// import 'prismjs';
// import 'prismjs/components/prism-typescript';
// import 'prismjs/components/prism-javascript';
// import 'prismjs/components/prism-css';
// import 'prismjs/components/prism-python';

// @Component({
//   selector: 'app-markdown-viewer',
//   standalone: true,
//   imports: [CommonModule],
//   template: `
//     <div class="markdown-content" [innerHTML]="renderedContent"></div>
//   `,
//   styles: [`
//     :host {
//       display: block;
//       width: 100%;
//     }
//   `]
// })
// export class MarkdownViewerComponent implements OnChanges {
//   @Input() content = '';
//   renderedContent: SafeHtml = '';

//   constructor(private sanitizer: DomSanitizer) {
//     // marked.setOptions({
//     //   highlight: function(code, lang) {
//     //     if (Prism.languages[lang]) {
//     //       return Prism.highlight(code, Prism.languages[lang], lang);
//     //     }
//     //     return code;
//     //   }
//     // });
//   }

//   ngOnChanges() {
//     const html = marked(this.content);
//     // this.renderedContent = this.sanitizer.bypassSecurityTrustHtml(html);
//   }
// }
