FROM microsoft/dotnet:2.1-aspnetcore-runtime

WORKDIR /app

COPY ./bin/Docker .

ENV ASPNETCORE_ENVIRONMENT docker
ENV ASPNETCORE_URLS=http://*:$PORT

CMD dotnet WebAPI.dll