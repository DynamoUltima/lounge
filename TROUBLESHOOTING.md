# NativeWind Troubleshooting

If styles are still not appearing, try the following steps:

1.  **Clear Metro Cache**:
    ```bash
    npx expo start --clear
    ```

2.  **Verify Configuration**:
    - `metro.config.js`: Should use `withNativeWind`.
    - `babel.config.js`: Should include `nativewind/babel` plugin.
    - `tailwind.config.js`: Should have correct `content` paths.
    - `global.css`: Should have `@tailwind` directives.
    - `app/_layout.tsx`: Should `import "../global.css"`.

3.  **Check for Errors**:
    - Look for errors in the terminal regarding CSS processing.

4.  **Reinstall Dependencies (Last Resort)**:
    - Delete `node_modules` and `package-lock.json`.
    - Run `npm install`.
