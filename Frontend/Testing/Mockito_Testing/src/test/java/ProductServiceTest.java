import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;


class Product {
    private String name;
    private String imageUrl;
    private String category;
    private double newPrice;
    private double oldPrice;

    public Product(String name, String imageUrl, String category, double newPrice, double oldPrice) {
        this.name = name;
        this.imageUrl = imageUrl;
        this.category = category;
        this.newPrice = newPrice;
        this.oldPrice = oldPrice;
    }

    public String getName() {
        return name;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public String getCategory() {
        return category;
    }

    public double getNewPrice() {
        return newPrice;
    }

    public double getOldPrice() {
        return oldPrice;
    }
}

interface ProductRepository {
    void save(Product product);
}

class ProductService {
    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public boolean addProduct(String name, String imageUrl, String category, double newPrice, double oldPrice) {
        Product product = new Product(name, imageUrl, category, newPrice, oldPrice);
        try {
            productRepository.save(product);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}

public class ProductServiceTest {

    @InjectMocks
    private ProductService productService;

    @Mock
    private ProductRepository productRepository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testAddProductSuccess() {

        String name = "Product1";
        String imageUrl = "http://example.com/image.jpg";
        String category = "men";
        double newPrice = 1000.0;
        double oldPrice = 1500.0;
        boolean result = productService.addProduct(name, imageUrl, category, newPrice, oldPrice);
        assertTrue(result);
        verify(productRepository, times(1)).save(any(Product.class));
    }

    @Test
    void testAddProductFailure() {

        String name = "Product1";
        String imageUrl = "http://example.com/image.jpg";
        String category = "men";
        double newPrice = 1000.0;
        double oldPrice = 1500.0;
        doThrow(new RuntimeException("Failed to save product")).when(productRepository).save(any(Product.class));
        boolean result = productService.addProduct(name, imageUrl, category, newPrice, oldPrice);
        assertFalse(result);
        verify(productRepository, times(1)).save(any(Product.class));
    }
}
