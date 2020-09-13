/* @jsx h */
import h from 'vhtml';
import { css } from 'linaria';

function Home({ ip }) {
  return (
    <main
      className={css`
        @apply min-h-screen flex items-center justify-center bg-gray-800;
      `}
    >
      <h2
        className={css`
          @apply text-4xl tracking-tight leading-none font-extrabold text-white text-center;
          @screen sm {
            @apply text-6xl;
          }
        `}
      >
        <span
          className={css`
            @apply text-indigo-400;
          `}
        >
          Your IP Address is
        </span>{' '}
        {ip}
      </h2>
    </main>
  );
}

export default Home;
