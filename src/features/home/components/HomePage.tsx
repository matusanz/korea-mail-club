import { Hero } from "./Hero";
import { Join } from "./Join";
import { Note } from "./Note";
import { Pieces } from "./Pieces";
import { PostcardFeature } from "./PostcardFeature";
import { Story } from "./Story";

export function HomePage() {
  return (
    <>
      <Hero />
      <Story />
      <Pieces />
      <PostcardFeature />
      <Join />
      <Note />
    </>
  );
}
