import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;

import java.io.File;

public class AddProductTest {
    WebDriver driver;

    @BeforeClass
    public void setup() {
//        System.setProperty("webdriver.chrome.driver", "/path/to/chromedriver");
        driver = new ChromeDriver();
        driver.get("http://localhost:5173/addproduct");
    }

    @Test
    public void testAddProductWithValidData() {
        // Enter product title
        WebElement productNameInput = driver.findElement(By.name("name"));
        productNameInput.sendKeys("Test Product");

        // Enter price
        WebElement priceInput = driver.findElement(By.name("old_price"));
        priceInput.sendKeys("100");

        // Enter offer price
        WebElement offerPriceInput = driver.findElement(By.name("new_price"));
        offerPriceInput.sendKeys("80");

        // Select category
        WebElement categorySelect = driver.findElement(By.name("category"));
        categorySelect.sendKeys("Men");

        // Upload an image
        WebElement fileInput = driver.findElement(By.id("file-input"));
        File file = new File("C:\\Users\\ASUS\\Downloads\\New folder\\images.jpg");

        fileInput.sendKeys(file.getAbsolutePath());

        // Click the add button
        WebElement addButton = driver.findElement(By.className("addproduct-btn"));
        addButton.click();

        // Validate the product added alert
//        String alertMessage = driver.switchTo().alert().getText();
//        Assert.assertTrue(alertMessage.contains("Product Added"));
//        driver.switchTo().alert().accept();
    }

    @AfterClass
    public void teardown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
