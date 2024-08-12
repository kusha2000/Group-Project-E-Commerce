import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;

public class LoginSignupValidationTest {
    WebDriver driver;

    @BeforeClass
    public void setup() {
        driver = new ChromeDriver();
        driver.get("http://localhost:3000/login");
    }

    @Test
    public void testLoginWithEmptyFields() {
        // Ensure the state is set to Login
        WebElement loginState = driver.findElement(By.xpath("//h1[text()='Login']"));
        Assert.assertTrue(loginState.isDisplayed());

        // Click continue button without filling fields
        WebElement continueButton = driver.findElement(By.xpath("//button[text()='Continue']"));
        continueButton.click();

        // Validate alert for empty fields
        String alertMessage = driver.switchTo().alert().getText();
        Assert.assertTrue(alertMessage.contains("Email is required."));
        driver.switchTo().alert().accept();
    }

    @Test
    public void testSignupWithEmptyFields() {
        // Switch to Sign Up state
        WebElement signupLink = driver.findElement(By.xpath("//span[text()='Click here']"));
        signupLink.click();

        // Ensure the state is set to Sign Up
        WebElement signupState = driver.findElement(By.xpath("//h1[text()='Sign Up']"));
        Assert.assertTrue(signupState.isDisplayed());

        // Click continue button without filling fields
        WebElement continueButton = driver.findElement(By.xpath("//button[text()='Continue']"));
        continueButton.click();

        // Validate alert for empty fields
        String alertMessage = driver.switchTo().alert().getText();
        Assert.assertTrue(alertMessage.contains("Username is required."));
        driver.switchTo().alert().accept();
    }

    @AfterClass
    public void teardown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
