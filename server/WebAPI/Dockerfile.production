FROM microsoft/dotnet:2.1-aspnetcore-runtime

WORKDIR /app

COPY ./bin/Docker .

ENV ASPNETCORE_ENVIRONMENT docker

CMD ASPNETCORE_URLS=http://*:$PORT dotnet WebAPI.dll