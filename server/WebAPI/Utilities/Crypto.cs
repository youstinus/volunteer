using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace WebAPI.Utilities
{
    public static class Crypto
    {
        public static string Encrypt(string source)
        {
            TripleDESCryptoServiceProvider desCryptoProvider = new TripleDESCryptoServiceProvider();

            byte[] byteBuff;

            try
            {
                desCryptoProvider.Key = Encoding.UTF8.GetBytes("s7^(v(WMjOi.mI387OPfYTcy.SWbX7zy");
                desCryptoProvider.IV = Encoding.UTF8.GetBytes("giK0vwUC");
                byteBuff = Encoding.UTF8.GetBytes(source);

                string iv = Convert.ToBase64String(desCryptoProvider.IV);
                Console.WriteLine("iv: {0}", iv);

                string encoded =
                    Convert.ToBase64String(desCryptoProvider.CreateEncryptor().TransformFinalBlock(byteBuff, 0, byteBuff.Length));

                return encoded;
            }
            catch (Exception except)
            {
                Console.WriteLine(except + "\n\n" + except.StackTrace);
                return null;
            }
        }

        public static string Decrypt(string encodedText)
        {
            TripleDESCryptoServiceProvider desCryptoProvider = new TripleDESCryptoServiceProvider();

            byte[] byteBuff;

            try
            {
                desCryptoProvider.Key = Encoding.UTF8.GetBytes("J0bg8HQ8InMZl&yZWFq18nMl");
                desCryptoProvider.IV = Encoding.UTF8.GetBytes("giK0vwUC");
                byteBuff = Convert.FromBase64String(encodedText);

                string plaintext = Encoding.UTF8.GetString(desCryptoProvider.CreateDecryptor().TransformFinalBlock(byteBuff, 0, byteBuff.Length));
                return plaintext;
            }
            catch (Exception except)
            {
                Console.WriteLine(except + "\n\n" + except.StackTrace);
                return null;
            }


        }
    }
}
