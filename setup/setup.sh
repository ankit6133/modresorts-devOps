#!/bin/sh

# ACTION should be one of:
#
#   ADD_LLM_ISSUES : Updates the code to include issues that LLM can solve
#   REMOVE_LLM_ISSUES : Updates the code to remove issues that LLM can solve
#

ACTION=$1

if [ "$ACTION" = "ADD_LLM_ISSUES" ]; then
    cp -f LLMIssues/DMBeanUtils.java.WITH_ISSUE ../src/main/java/com/acme/modres/mbean/DMBeanUtils.java
    
    cp -f LLMIssues/WelcomeServlet.java.WITH_ISSUE ../src/main/java/com/acme/modres/WelcomeServlet.java
    rm -f ../src/main/java/com/acme/modres/FirstFilter.java
    rm -f ../src/main/java/com/acme/modres/SecondFilter.java
    cp -f LLMIssues/FirstServlet.java.WITH_ISSUE ../src/main/java/com/acme/modres/FirstServlet.java
    cp -f LLMIssues/SecondServlet.java.WITH_ISSUE ../src/main/java/com/acme/modres/SecondServlet.java
    cp -f LLMIssues/web.xml.WITH_ISSUE ../WebContent/WEB-INF/web.xml

elif [ "$ACTION" = "REMOVE_LLM_ISSUES" ]; then
    cp -f LLMIssues/DMBeanUtils.java.WITHOUT_ISSUE ../src/main/java/com/acme/modres/mbean/DMBeanUtils.java
    
    cp -f LLMIssues/WelcomeServlet.java.WITHOUT_ISSUE ../src/main/java/com/acme/modres/WelcomeServlet.java
    rm -f ../src/main/java/com/acme/modres/FirstServlet.java
    rm -f ../src/main/java/com/acme/modres/SecondServlet.java
    cp -f LLMIssues/FirstFilter.java.WITHOUT_ISSUE ../src/main/java/com/acme/modres/FirstFilter.java
    cp -f LLMIssues/SecondFilter.java.WITHOUT_ISSUE ../src/main/java/com/acme/modres/SecondFilter.java
    cp -f LLMIssues/web.xml.WITHOUT_ISSUE ../WebContent/WEB-INF/web.xml
else
    echo "ERROR: Not a valid ACTION"
fi

