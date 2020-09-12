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
          @apply mt-4 text-4xl tracking-tight leading-10 font-extrabold text-white text-center;
          @screen sm {
            @apply mt-5 leading-none text-6xl;
          }
          @screen lg {
            @apply mt-6 text-5xl;
          }
          @screen xl {
            @apply text-6xl;
          }
        `}
      >
        <span
          className={css`
            @apply text-indigo-400;
          `}
        >
          Your IP Address is{' '}
        </span>
        {ip}
      </h2>
    </main>
  );
}

export default Home;
