import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;

public class LoginTest {
    WebDriver driver;

    @BeforeClass
    public void setup() {
        driver = new ChromeDriver();
        driver.get("http://localhost:3000/login");
    }

    @Test
    public void testLoginWithValidData() {
        WebElement loginState = driver.findElement(By.xpath("//h1[text()='Login']"));
        Assert.assertTrue(loginState.isDisplayed());

        // Enter email
        WebElement emailInput = driver.findElement(By.name("email"));
        emailInput.sendKeys("test@example.com");

        // Enter password
        WebElement passwordInput = driver.findElement(By.name("password"));
        passwordInput.sendKeys("password123");

        // Click continue button
        WebElement continueButton = driver.findElement(By.xpath("//button[text()='Continue']"));
        continueButton.click();

        // Validate successful login
        Assert.assertEquals(driver.getCurrentUrl(), "http://localhost:3000/login");

    }

    @AfterClass
    public void teardown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
