<template>
  <div>
      <div>
        <!-- quill-editor -->
        <quill-editor ref="myTextEditor"
                      v-model="content"
                      :options="editorOption"
                      @blur="onEditorBlur($event)"
                      @focus="onEditorFocus($event)"
                      @ready="onEditorReady($event)"
                      @change="onEditorChange($event)"
                      >
        </quill-editor>
        <br>
        <button class="btn btn-info" type="submit" @click="addPost">SUBMIT</button>
        <div class="quill-code">
          <br> <br>
          <code class="hljs" v-html="contentCode"></code>
        </div>
      </div>
  </div>
   
</template>

<script>
import hljs from "highlight.js";
import { quillEditor } from "vue-quill-editor";
import swal from 'sweetalert';
export default {
	components: {
		quillEditor
	},
	data() {
		return {
			content: "",
			transformedContent: "",
			editorOption: {
				modules: {
					toolbar: [
						["bold", "italic", "underline", "strike"],
						["blockquote", "code-block"],
						[{ header: 1 }, { header: 2 }],
						[{ list: "ordered" }, { list: "bullet" }],
						[{ script: "sub" }, { script: "super" }],
						[{ indent: "-1" }, { indent: "+1" }],
						[{ direction: "rtl" }],
						[{ size: ["small", false, "large", "huge"] }],
						[{ header: [1, 2, 3, 4, 5, 6, false] }],
						[{ font: [] }],
						[{ color: [] }, { background: [] }],
						[{ align: [] }],
						["clean"],
						["link", "image", "video"]
					],
					syntax: {
						highlight: text => hljs.highlightAuto(text).value
					}
				}
			}
		};
	},
	methods: {
		onEditorBlur(editor) {
			// console.log('editor blur!', editor)
		},
		onEditorFocus(editor) {
			// console.log('editor focus!', editor)
		},
		onEditorReady(editor) {
			// console.log('editor ready!', editor)
		},
		onEditorChange({quill, html, text}) {
			// console.log('editor change!',html, text)
		
			this.content = html
			this.transformedContent = text
		},
		addPost() {
			this.$emit("newContent", this.content);
			swal({
				title: "Coming soon!",
				text: "We are working hard on it!",
				icon: "success"
			});
		}
	},
	computed: {
		editor() {
			return this.$refs.myTextEditor.quill;
		},
		contentCode() {
			return hljs.highlightAuto(this.content).value;
		}
	},
	mounted() {
		// console.log('this is my editor', this.editor)
		setTimeout(() => {
			this.content = ``;
		}, 1300);
	}
};
</script>

<style lang="scss" scoped>
.quill-code {
	border: none;
	height: auto;
	.code {
		width: 100%;
		margin: 0;
		padding: 1rem;
		border: 1px solid #ccc;
		border-top: none;
		border-radius: 0;
		height: 10rem;
		overflow-y: auto;
		resize: vertical;
	}
}
</style>