from PIL import Image

# Load image
image = Image.open("/Users/muhammedfaheem/Downloads/IMG_8418.JPG").convert("RGBA")
pixels = image.load()

# Get image dimensions
width, height = image.size

# Define the block to be changed (bottom-right corner, 200px wide × 100px high)
block_width = 200
block_height = 100
start_x = width - block_width
start_y = height - block_height

# Set color to black
black = (0, 0, 0, 255)

# Loop over the target area and set each pixel to black
for y in range(start_y, height):
    for x in range(start_x, width):
        pixels[x, y] = black

# Save the modified image
image.save("Flyfe_logo_bottom_right_black.png")