#Depending on the operating system of the host machines(s) that will build or run the containers, the image specified in the FROM statement may need to be changed.
#For more information, please see https://aka.ms/containercompat

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-alpine3.9 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443
ENV ASPNETCORE_ENVIRONMENT "Staging"

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-alpine3.9 AS build
WORKDIR /src
COPY ["TokenGenerationService.csproj", ""]
RUN dotnet restore "./TokenGenerationService.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "TokenGenerationService.csproj" -c Release -o /app

FROM build AS publish
RUN dotnet publish "TokenGenerationService.csproj" -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "TokenGenerationService.dll"]