FROM microsoft/dotnet:2.1-sdk as builder  

RUN mkdir -p /root/src/app/WebAPI
WORKDIR /root/src/app/WebAPI
 
COPY WebAPI.csproj .
RUN dotnet restore ./WebAPI.csproj

COPY . .
RUN dotnet publish -c release -o published

FROM microsoft/dotnet-nightly:2.1-runtime-alpine

WORKDIR /root/
COPY --from=builder /root/src/app/WebAPI/published .
ENV ASPNETCORE_URLS=http://+:5000
EXPOSE 5000/tcp
CMD ["dotnet", "./WebAPI.dll"]  