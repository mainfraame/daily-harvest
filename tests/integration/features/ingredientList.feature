Feature: Ingredient List

  Background:
    Given the application is rendered

  Scenario: Card Ingredients
    When the Acai + Cherry card's ingredients are shown
    Then the Acai + Cherry card's ingredients are:
      | Organic Acai Berry |
      | Organic Banana     |
      | Organic Blueberry  |
      | Organic Cherry     |
      | Organic Kale       |
