<?php
/**
 * Plugin Name: My Chatbot
 * Description: Intègration d'un chatbot RAG à WordPress.
 * Version: 1.0
 * Author: Yohan Ruffieux
 */

// Assurez-vous que le code est exécuté dans le contexte de WordPress
if (!defined('ABSPATH')) {
    exit;
}

// Enqueue les scripts et styles
function my_chatbot_enqueue_scripts() {
    wp_enqueue_style('my-chatbot-css', plugin_dir_url(__FILE__) . './assets/css/chatbot.css');
    wp_enqueue_script('my-chatbot-js', plugin_dir_url(__FILE__) . './assets/js/chatbot.js', array(), false, true);
}
add_action('wp_enqueue_scripts', 'my_chatbot_enqueue_scripts');

// Ajoute le shortcode pour insérer le chatbot
function my_chatbot_shortcode() {
    ob_start();
    ?>
    <div id="my-chatbot">
        <div id="chat-history"></div>
        <input type="text" id="chat-input" placeholder="Entrez votre message...">
        <button id="send-message">Envoyer</button>
    </div>
    <?php
    return ob_get_clean();
}

add_shortcode('my_chatbot', 'my_chatbot_shortcode');