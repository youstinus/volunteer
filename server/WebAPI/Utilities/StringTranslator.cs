using System;
using Npgsql;

namespace WebAPI.Utilities
{
    public static class StringTranslator
    {
        public static string GetConnectionString()
        {
            var databaseUrl = Environment.GetEnvironmentVariable("DATABASE_URL");

            if (string.IsNullOrWhiteSpace(databaseUrl))
                return null;//databaseUrl = "postgres://pcigxbfhhjwcbt:af49c9895b95e5fe925199f0f5632a67a843632cb963fbd5316bd76617b711cd@ec2-54-246-92-116.eu-west-1.compute.amazonaws.com:5432/d8cf73p3n5cald";//

            var databaseUri = new Uri(databaseUrl);
            var userInfo = databaseUri.UserInfo.Split(':');

            var builder = new NpgsqlConnectionStringBuilder
            {
                Host = databaseUri.Host,
                Port = databaseUri.Port,
                Username = userInfo[0],
                Password = userInfo[1],
                Database = databaseUri.LocalPath.TrimStart('/'),
                Pooling = true,
                UseSslStream = true,
                SslMode = SslMode.Require,
                TrustServerCertificate = true
            };

            return builder.ToString();
        }
    }
}
