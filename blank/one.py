from PIL import Image
import matplotlib.pyplot as plt

# Load the image
image = Image.open("/Users/muhammedfaheem/Downloads/IMG_8418.JPG").convert("RGBA")

# Get original image size
width, height = image.size

# Create new image with extended height
extended_height = height + 100  # Adjust as needed
extended_image = Image.new("RGBA", (width, extended_height), (0, 0, 0, 255))  # Black background
extended_image.paste(image, (0, 0))

# Show the result
plt.imshow(extended_image)
plt.axis("off")
plt.show()

# Save as PNG
extended_image.save("Flyfe_logo_extended.png", "PNG")
