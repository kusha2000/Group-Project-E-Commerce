import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

class User {
    private String username;
    private String email;
    private String password;

    public User(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }
}

interface UserRepository {
    User findByEmail(String email);
    void save(User user);
}

class TokenService {
    public String generateToken(User user) {
        return "mocked-token";
    }
}

class AuthService {
    private final UserRepository userRepository;
    private final TokenService tokenService;

    public AuthService(UserRepository userRepository, TokenService tokenService) {
        this.userRepository = userRepository;
        this.tokenService = tokenService;
    }

    public boolean login(String email, String password) {
        User user = userRepository.findByEmail(email);
        if (user != null && user.getPassword().equals(password)) {
            String token = tokenService.generateToken(user);
            return token != null;
        }
        return false;
    }

    public boolean signup(String username, String email, String password) {
        User existingUser = userRepository.findByEmail(email);
        if (existingUser != null) {
            return false;
        }
        User newUser = new User(username, email, password);
        userRepository.save(newUser);
        return true;
    }
}

public class AuthServiceTest {

    @InjectMocks
    private AuthService authService;

    @Mock
    private UserRepository userRepository;

    @Mock
    private TokenService tokenService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void testLoginSuccess() {

        String email = "test@example.com";
        String password = "password";
        User mockUser = new User("testuser", email, password);
        when(userRepository.findByEmail(email)).thenReturn(mockUser);
        when(tokenService.generateToken(mockUser)).thenReturn("mocked-token");
        boolean result = authService.login(email, password);
        assertTrue(result);
        verify(userRepository, times(1)).findByEmail(email);
        verify(tokenService, times(1)).generateToken(mockUser);
    }

    @Test
    void testLoginFailureInvalidPassword() {

        String email = "test@example.com";
        String password = "wrongpassword";
        User mockUser = new User("testuser", email, "password");
        when(userRepository.findByEmail(email)).thenReturn(mockUser);
        boolean result = authService.login(email, password);
        assertFalse(result);
        verify(userRepository, times(1)).findByEmail(email);
        verify(tokenService, never()).generateToken(mockUser);
    }

    @Test
    void testSignupSuccess() {

        String username = "testuser";
        String email = "test@example.com";
        String password = "password";
        when(userRepository.findByEmail(email)).thenReturn(null);
        boolean result = authService.signup(username, email, password);
        assertTrue(result);
        verify(userRepository, times(1)).save(any(User.class));
    }

    @Test
    void testSignupFailureUserAlreadyExists() {

        String username = "testuser";
        String email = "test@example.com";
        String password = "password";
        User existingUser = new User(username, email, password);
        when(userRepository.findByEmail(email)).thenReturn(existingUser);
        boolean result = authService.signup(username, email, password);
        assertFalse(result);
        verify(userRepository, never()).save(any(User.class));
    }
}
