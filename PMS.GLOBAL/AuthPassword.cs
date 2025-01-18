using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace PMS
{
	public class AuthPassword
	{
		#region constructor
		public AuthPassword() { }
		#endregion

		#region Create Salt
		public string CreateSalt(int size)
		{
			byte[] buff = new byte[size];
			RandomNumberGenerator rng = RandomNumberGenerator.Create();
			rng.GetBytes(buff);
			return Convert.ToBase64String(buff);
		}
		#endregion

		#region Generate Hash
		public string GenerateHash(string input, string salt)
		{
			byte[] bytes = Encoding.UTF8.GetBytes(input + salt);
			SHA256 sha = SHA256.Create();
			byte[] hash = sha.ComputeHash(bytes);
			return Convert.ToBase64String(hash);
		}
		#endregion

		#region Password Equalization 
		public bool AreEqual(string plainTextInput, string hashedInput, string salt)
		{
			string newHashedPin = GenerateHash(plainTextInput, salt);
			return newHashedPin.Equals(hashedInput);
		}
		#endregion

		#region Random Password
		public string GenerateRandomPassword()
		{
			const string validChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()?><+";
			Random random = new Random();
			int length = random.Next(10, 12);
			StringBuilder password = new StringBuilder();
			for (int i = 0; i < length; i++)
			{
				int index = random.Next(validChars.Length);
				password.Append(validChars[index]);
			}
			return password.ToString();
		}
		#endregion

		#region Random Password withLength
		public string GenerateRandomPassword(int length)
		{
			const string validChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()?><+";
			Random random = new Random();
			//int length = random.Next(8, 12);
			StringBuilder password = new StringBuilder();
			for (int i = 0; i < length; i++)
			{
				int index = random.Next(validChars.Length);
				password.Append(validChars[index]);
			}
			return password.ToString();
		}
		#endregion

		#region Random Password with min max Length
		public string GenerateRandomPassword(int minLength, int maxLength)
		{
			const string validChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()?><+";
			Random random = new Random();
			int length = random.Next(minLength, maxLength);
			StringBuilder password = new StringBuilder();
			for (int i = 0; i < length; i++)
			{
				int index = random.Next(validChars.Length);
				password.Append(validChars[index]);
			}
			return password.ToString();
		}
		#endregion

		#region Random Password withLength(HARD)
		public string GenerateRandomHardPassword(int length)
		{
			const string numbers = "0123456789";

			StringBuilder sb = new StringBuilder();
			Random rnd = new Random();

			int totalLength = length / 4;


			for (int i = 0; i < totalLength; i++)
			{
				int index = rnd.Next(numbers.Length);
				sb.Append(numbers[index]);
			}

			const string smallchars = "abcdefghijklmnopqrstuvwxyz";
			rnd = new Random();

			for (int i = 0; i < totalLength; i++)
			{
				int index = rnd.Next(smallchars.Length);
				sb.Append(smallchars[index]);
			}

			const string capchars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
			rnd = new Random();

			int nlength2 = totalLength + (length % 4);
			for (int i = 0; i < nlength2; i++)
			{
				int index = rnd.Next(capchars.Length);
				sb.Append(capchars[index]);
			}

			const string spechars = "!$&@";
			rnd = new Random();

			for (int i = 0; i < totalLength; i++)
			{
				int index = rnd.Next(spechars.Length);
				sb.Append(spechars[index]);
			}

			return sb.ToString();
		}
		#endregion

		#region Random LoginID
		public string GenerateRandomLoginID()
		{
			const string validChars = "0123456789";
			Random random = new Random();
			int length = random.Next(3, 4);
			StringBuilder password = new StringBuilder();
			password.Append("00");
			for (int i = 0; i < length; i++)
			{
				int index = random.Next(validChars.Length);
				password.Append(validChars[index]);
			}
			return password.ToString();
		}
		#endregion

		#region Random UserNo
		public string GenerateRandomUserNo()
		{
			const string validChars = "0123456789";
			Random random = new Random();
			int length = random.Next(5, 5);
			StringBuilder userNo = new StringBuilder();
			userNo.Append("01");
			for (int i = 0; i < length - 2; i++)
			{
				int index = random.Next(validChars.Length);
				userNo.Append(validChars[index]);
			}
			return userNo.ToString();
		}
		#endregion
	}
}
