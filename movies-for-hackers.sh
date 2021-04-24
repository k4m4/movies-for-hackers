#/bin/sh

case $SHELL in
	*bash)
		ECHO='echo -e'
		;;
	*)
		ECHO='echo'
		;;
esac

purple="\033[0;35m"
red="\033[1;31m"
green="\033[1;32m"
blue="\033[1;34m"

clear; ${ECHO} ""
${ECHO} "$purple "
${ECHO} "   			███╗   ███╗ ██████╗ ██╗   ██╗██╗███████╗███████╗ "
${ECHO} "   			████╗ ████║██╔═══██╗██║   ██║██║██╔════╝██╔════╝ "
${ECHO} "   			██╔████╔██║██║   ██║██║   ██║██║█████╗  ███████╗ "
${ECHO} "   			██║╚██╔╝██║██║   ██║╚██╗ ██╔╝██║██╔══╝  ╚════██║ "
${ECHO} "   			██║ ╚═╝ ██║╚██████╔╝ ╚████╔╝ ██║███████╗███████║ "
${ECHO} "   			╚═╝     ╚═╝ ╚═════╝   ╚═══╝  ╚═╝╚══════╝╚══════╝ "

${ECHO} ""
${ECHO} "	███████╗ ██████╗ ██████╗     ██╗  ██╗ █████╗  ██████╗██╗  ██╗███████╗██████╗ ███████╗ "
${ECHO} "	██╔════╝██╔═══██╗██╔══██╗    ██║  ██║██╔══██╗██╔════╝██║ ██╔╝██╔════╝██╔══██╗██╔════╝ "
${ECHO} "	█████╗  ██║   ██║██████╔╝    ███████║███████║██║     █████╔╝ █████╗  ██████╔╝███████╗ "
${ECHO} "	██╔══╝  ██║   ██║██╔══██╗    ██╔══██║██╔══██║██║     ██╔═██╗ ██╔══╝  ██╔══██╗╚════██║ "
${ECHO} "	██║     ╚██████╔╝██║  ██║    ██║  ██║██║  ██║╚██████╗██║  ██╗███████╗██║  ██║███████║ "
${ECHO} "	╚═╝      ╚═════╝ ╚═╝  ╚═╝    ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚══════╝ "

${ECHO} ""

${ECHO} $green"              A list of movies every hacker & cyberpunk must watch ("$red"Movies For Hackers"$green")"
${ECHO} $blue "           	           Made with <3 by:"$green" Nikolaos Kamarinakis ("$red"k4m4"$green")"

${ECHO} ""

jq -Rn '
  {"items":
    [inputs
     | . / "\n"
     | (.[] | select(length > 0) | . / ",") as $input
     | {"imdb": $input[0], "title": $input[1], "genre": $input[2], "year": $input[3], "rating": $input[4]}]}
' < movies-for-hackers.csv