# Set a custom session root path. Default is `$HOME`.
# Must be called before `initialize_session`.
session_root "~/Code/retro-game-space-invaders/"

# Create session with specified name if it does not already exist. If no
# argument is given, session name will be based on layout file name.
if initialize_session "js-invaders"; then

  new_window "editor"
  new_window "live-server"
  new_window "gen-cmd"

  # Instructions for editor window
  select_window 1
  run_cmd "nvim"
  # Instructions for live server window
  select_window 2
  run_cmd "http-server -o"

fi

# Finalize session creation and switch/attach to it.
finalize_and_go_to_session
