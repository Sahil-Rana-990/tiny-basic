import React, { useRef, useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import HtmlParser from "html-react-parser";
//import DOMPurify from 'dompurify';
import axios from "axios";

export default function App() {
  //const htmlParser=new Parser();
  //          -------------------------------- screct -----------------------------------------------
  const PROJECT_CLOUD_NAME = "project";
  const PROJECT_CLOUD_API_KEY = "771814256556894";
  const PROJECT_CLOUD_SECRECT_KEY = "66_v55ZX7s0i_TNFTVcyORwQ_hw";
  //          -------------------------------- screct -----------------------------------------------

  const editorRef = useRef(null);

  let [post, setpost] = useState({
    content: "",
  });
  let [files, setfiles] = useState(0);
  const storedData = () => {
    if (editorRef.current) {
      let editortext = editorRef.current.getContent();

      let oldarr = JSON.parse(localStorage.getItem("commentArray"));
      oldarr.push(editortext);
      localStorage.setItem("commentArray", JSON.stringify(oldarr));
      setpost({ ...post });
    }
  };

   const convertHTMLStrToReactComponent=(id,htmlstr)=>{
    setTimeout(()=>{
      document.querySelector(`.com${id}`).innerHTML=htmlstr;
    },0   )
  } 
  return (
    <>
     
      {JSON.parse(localStorage.getItem("commentArray")).map((val, i) => {
        
        if(val===""){
          return;
        }else{
          return(
            <div key={i}>
              <h1 className={`com${i}`}></h1>
              {convertHTMLStrToReactComponent(i,val)}
            </div>
          )
        }
      })}

      <input
        type="file"
        id="my-file"
        name="my-file"
        style={{ visibility: "hidden" }}
        onChange={(e) => setfiles(e.target.files[0])}
      />

      <Editor
        id="data"
        apiKey="vgqslsc9vjjerm2s36zxvqup8dzwlo0sreuw2g3uk1ypv24j"
        // onChange={(e)=>console.log(e.target.getContent())}
        onInit={(evt, editor) => (editorRef.current = editor)}
        init={{
          height: 300,
          menubar: true,
          plugins: [
            "advlist",
            "autolink",
            "link",
            "image",
            "editimage",
            "lists",
            "charmap",
            "preview",
            "anchor",
            "pagebreak",
            "searchreplace",
            "wordcount",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "mathquill",
            "template",
            "help",
          ],
          file_browser_callback_types: "image",
          file_picker_callback: function (callback, value, meta) {
            if (meta.filetype == "image") {
              var input = document.getElementById("my-file");
              input.click();
              input.onchange = async function () {
                async function readFileAsDataURL(file) {
                  let result_base64 = await new Promise((resolve) => {
                    let fileReader = new FileReader();
                    fileReader.onload = (e) => resolve(fileReader.result);
                    fileReader.readAsDataURL(file);
                  });
                  return result_base64;
                }
                var file = input.files[0];
                let data64image = await readFileAsDataURL(file);
                console.log(data64image);

                const res = await fetch("https://tiny-basic-api.vercel.app/api/getimage", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ data: data64image }),
                });
                const data = await res.json();
                callback(data.imaeURL);
              };
            }
          },
          paste_data_images: true,
          forced_root_block: "div",
          forced_root_block_attrs: {
            style: "color:#040304 ; font-family:sans-serif,Roboto",
          },
          toolbar:
            "undo redo fontsizeinput fontfamilyinput | styles | bold italic underline | alignleft aligncenter alignright alignjustify | " +
            "bullist numlist outdent indent | link image | print preview media fullscreen | " +
            "forecolor backcolor charmap blockquote lineheight code selectall strikethrough subscript superscript addcomment",
          content_style:
            "body {line-height:18px;font-family:Arial;color:#040304}",
        }}
      />

      <button onClick={storedData}>Log editor content</button>
    </>
  );
}
