# space-invaders

Simple game based on HTML + vanilla JS. Has a scoring method and waves of enemies which keep increasing w/ time.

## Running locally

- Ensure you have `http-server` installed [npm i -g http-server]
- [Optional]  
- Run `http-server -o` to start a watch server for the html/js changes

### [OPTIONAL] Local Development using tmux

- Ensure `[tmux](https://github.com/tmux/tmux/wiki/Installing#installing-tmux)` is installed
- Ensure `[tmuxifier](https://github.com/jimeh/tmuxifier?tab=readme-ov-file#installation)` is installed
- Run `tmuxifier ns js-space-invaders` or any other unique name
- Copy over the contents from `tmux-config.sh` in the root of the repo 
- Save and exit. To run the config use `tmuxifier s js-space-invaders`
