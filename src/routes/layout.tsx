import { component$, Slot } from '@builder.io/qwik';
import Header from '../components/blog/header/header';

export default component$(() => {
  return (
    <>
      <main>
        <section>
          <Slot />
        </section>
      </main>
      <footer>
        <a href="https://www.builder.io/" target="_blank">
          フッター
        </a>
      </footer>
    </>
  );
});
