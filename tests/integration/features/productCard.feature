Feature: Product Card

  Background:
    Given the application is rendered

  Scenario: Initial Rendering
    Then GET /api/ingredients is called
    And GET /api/products is called
    And the product cards are rendered:
      | name                  | collection   | images |
      | Acai + Cherry         | smoothie     | 6      |
      | Beet + Avocado Poke   | harvest bowl | 4      |
      | Chocolate + Blueberry | smoothie     | 4      |
      | Cinnamon + Banana     | oat bowl     | 4      |
      | Ginger + Greens       | smoothie     | 6      |
      | Mushroom + Miso       | soup         | 4      |

  Scenario Outline: Card Navigation Buttons
    When the <name> card's <btn> nav button is clicked
    Then the <name> card's navigation index is updated to <position>

    Examples:
      | name          | btn  | position |
      | Acai + Cherry | next | 1        |
      | Acai + Cherry | next | 2        |
      | Acai + Cherry | next | 3        |
      | Acai + Cherry | next | 4        |
      | Acai + Cherry | next | 5        |
      | Acai + Cherry | next | 0        |
      | Acai + Cherry | prev | 5        |
      | Acai + Cherry | prev | 4        |
      | Acai + Cherry | prev | 3        |
      | Acai + Cherry | prev | 2        |
      | Acai + Cherry | prev | 1        |

  Scenario: Card Navigation Index Buttons
    When the Acai + Cherry card's 3 nav index button is clicked
    Then the Acai + Cherry card's navigation index is updated to 3
