# Build Stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /source
COPY . .
RUN dotnet restore "./BrieflyServer.csproj" --disable-parallel
RUN dotnet publish "./BrieflyServer.csproj" -c release -o /app --no-restore

# Serve Stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app ./
COPY ./Other ./Other

EXPOSE 8080

# Set the entry point
ENTRYPOINT ["dotnet", "BrieflyServer.dll"]
