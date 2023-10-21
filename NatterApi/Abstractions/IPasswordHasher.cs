namespace NatterApi.Abstractions;

public interface IPasswordHasher {

    string HashPassword(string inputPassword);

    bool Verify(string passwordHash, string inputPassword);
}
