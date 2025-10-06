# An Electron wrapper for the BBC iPlayer website
This has only been tested on Windows 11, if you face any issues or visual bugs, [please file an issue](https://github.com/donnybeelo/iplayer-electron/issues).

## Build instructions
Clone the repo, then run:
```bash
npm run package
```

This will generate some form of standalone executable _stuff_ under the `out/` directory.

On Windows, I moved the contents of that directory (that being another directory which then contains the executable jargon, in my experience) into `C:\Program Files` 
and created a shortcut in `C:\ProgramData\Microsoft\Windows\Start Menu\Programs` to be able to launch it from the Start menu.
