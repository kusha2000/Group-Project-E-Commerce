import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;

public class SignupTest {
    WebDriver driver;

    @BeforeClass
    public void setup() {
        driver = new ChromeDriver();
        driver.get("http://localhost:3000/login");
    }

    @Test
    public void testSignupWithValidData() {
        // Switch to Sign Up state
        WebElement signupLink = driver.findElement(By.xpath("//span[text()='Click here']"));
        signupLink.click();

        // Ensure the state is set to Sign Up
        WebElement signupState = driver.findElement(By.xpath("//h1[text()='Sign Up']"));
        Assert.assertTrue(signupState.isDisplayed());

        // Enter username
        WebElement usernameInput = driver.findElement(By.name("username"));
        usernameInput.sendKeys("testuser");

        // Enter email
        WebElement emailInput = driver.findElement(By.name("email"));
        emailInput.sendKeys("test@example.com");

        // Enter password
        WebElement passwordInput = driver.findElement(By.name("password"));
        passwordInput.sendKeys("password123");

        // Click continue button
        WebElement continueButton = driver.findElement(By.xpath("//button[text()='Continue']"));
        continueButton.click();

        // Validate successful signup
        Assert.assertEquals(driver.getCurrentUrl(), "http://localhost:3000/login");
    }

    @AfterClass
    public void teardown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
