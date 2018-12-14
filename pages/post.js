import Layout from "../components/MyLayout.js";
import fetch from "isomorphic-unfetch";
import Markdown from "react-markdown";
import marked from "marked";
// import Highlight from "react-highlight";
import dynamic from "next/dynamic";

const Highlight = dynamic(import("react-highlight"));

marked.setOptions({
  gfm: true,
  tables: true,
  breaks: true
});

const Post = props => (
  <Layout>
    <h1>{props.show.name}</h1>
    <Highlight innerHTML>{marked(props.show.summary.replace(/<[/]?p>/g, ""))}</Highlight>
    <img src={props.show.image.medium} />
    <div className="markdown">
      <Markdown
        source={`
This is our blog post.
Yes. We can have a [link](/link).
And we can have a title as well.

### This is a title

And here's the content.
     `}
      />
    </div>
    <style jsx global>{`
      .markdown {
        font-family: "Arial";
      }

      .markdown a {
        text-decoration: none;
        color: blue;
      }

      .markdown a:hover {
        opacity: 0.6;
      }

      .markdown h3 {
        margin: 0;
        padding: 0;
        text-transform: uppercase;
      }
    `}</style>
  </Layout>
);

Post.getInitialProps = async function(context) {
  const { id } = context.query;
  const res = await fetch(`https://api.tvmaze.com/shows/${id}`);
  const show = await res.json();

  console.log(`Fetched show: ${show.name}`);

  return { show };
};

export default Post;
