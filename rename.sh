#!/usr/bin/env bash

newAppName=$1
newLowerCaseName=`echo $newAppName | tr '[:upper:]' '[:lower:]'`

appRoot=`dirname $0`

[ -z "${newAppName}" ] && echo 'Missing required parameter newAppName' && exit 1

grep -rI 'RxReactNativeBoilerplate' --exclude='rename.sh' $appRoot/* | tr ':' ' ' | awk '{print $1}' | uniq | xargs -I{} sed -i.bak "s/RxReactNativeBoilerplate/${newAppName}/g" {}
grep -rI 'rxreactnativeboilerplate' --exclude='rename.sh' $appRoot/* | tr ':' ' ' | awk '{print $1}' | uniq | xargs -I{} sed -i.bak "s/rxreactnativeboilerplate/${newLowerCaseName}/g" {}
find . -name '*.bak' -exec rm {} \;

for fileToMove in `find $appRoot/ios -depth -name '*RxReactNativeBoilerplate*'`; do
  mv $fileToMove `echo $fileToMove | sed "s/\(.*\)RxReactNativeBoilerplate/\1$newAppName/g"`
done

for fileToMove in `find $appRoot/android -depth -name '*rxreactnativeboilerplate*'`; do
  mv $fileToMove `echo $fileToMove | sed "s/\(.*\)rxreactnativeboilerplate/\1$newLowerCaseName/g"`
done

YELLOW='\033[1;33m'
CLEAR='\033[0m'
printf "\nRenamed application to ${newAppName}"
printf "${YELLOW}\n\nIf you have previously built the application, please clean your build artifacts"
printf "${YELLOW}\n\nAndroid:\n(cd android; ./gradlew clean)"
printf "${YELLOW}\n\niOS:\nClean build folders in XCode (Option+Shift+Cmd+K)\nReinstall CocoaPods (cd ios; pod install)\n"
