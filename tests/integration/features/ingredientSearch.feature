Feature: Ingredient Search

  Background:
    Given the application is rendered

#  Scenario: Search By Single Ingredient
#    When a search is conducted for products with Organic Banana
#    Then GET /api/products is called with params:
#      """
#        {
#          "ingredient": "3"
#        }
#      """
#    And the product cards are rendered:
#      | name                  | collection | images |
#      | Acai + Cherry         | smoothie   | 6      |
#      | Chocolate + Blueberry | smoothie   | 4      |
#      | Cinnamon + Banana     | oat bowl   | 4      |
#      | Ginger + Greens       | smoothie   | 6      |
#
#  Scenario: Search By Multiple Ingredients
#    When a search is conducted for products with Organic Cherry, Organic Flax Seeds
#    Then GET /api/products is called with params:
#      """
#        {
#          "ingredient": ["2", "11"]
#        }
#      """
#    And the product cards are rendered:
#      | name            | collection | images |
#      | Acai + Cherry   | smoothie   | 6      |
#      | Ginger + Greens | smoothie   | 6      |
#
#  Scenario: Clearing Prior Search
#    When the previous search is cleared
#    Then GET /api/products is called with params:
#      """
#        {}
#      """
#    And the product cards are rendered:
#      | name                  | collection   | images |
#      | Acai + Cherry         | smoothie     | 6      |
#      | Beet + Avocado Poke   | harvest bowl | 4      |
#      | Chocolate + Blueberry | smoothie     | 4      |
#      | Cinnamon + Banana     | oat bowl     | 4      |
#      | Ginger + Greens       | smoothie     | 6      |
#      | Mushroom + Miso       | soup         | 4      |

  Scenario: Search Returning No Products
    When a search is conducted for products with Hazelnuts
    Then GET /api/products is called with params:
      """
        {
          "ingredient": "6"
        }
      """
    And the no products alert is displayed
