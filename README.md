Create .env.local file in root dir with the following strucutre:

EXPO_PUBLIC_BACKEND_API=XXXXXX
EXPO_PUBLIC_BEFORE_WAIT_FOR_NEXT_CYCLE=XXXXXX
EXPO_PUBLIC_AFTER_WAIT_FOR_NEXT_CYCLE=XXXXXX
EXPO_PUBLIC_DEV_URL=XXXXXX



### Deployment

1. Build:: npx expo export -p web --clear
2. Publish:: sudo netlify deploy --dir dist --prod