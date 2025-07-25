## Project Overview

This project is a dynamic form builder application that empowers users to visually create, reorder, edit, and preview customizable forms without writing any code. The form structure is driven by a flexible JSON schema, supporting various input types and field properties. It features intuitive drag-and-drop interactions for adding and reordering fields, inline element actions, and a dedicated settings sidebar for granular control over each form element.

## For Source Code

1. clone the github command

# git clone https://github.com/shahinur009/from-builder.git

# open with vs code = code .

# npm install / npm i

# npm run dev

## Deploy on Vercel

visit form builder domain:

# https://from-builder-delta.vercel.app/

## Feature:
# Renders forms dynamically based on a provided JSON schema.

# Input types: text, email, date, time, file, select, checkbox, radio, and acceptance.

# Field properties: label, name, placeholder, required, columnWidth, and options.
# When hovering over any form field in the builder canvas, three action buttons appear: edit, setting, duplicate
# Right side show setting
# Left side show input field and drag and drop options
# All data save in the localStorage
# Preview Button
# Save data to local storage with clicking save button

## Technologist
# Next.js
# React.js
# react.dnd
# tailwind css
# React DOM

## Folder Structure:
# app-> layout.jsx, page.jsx, global.css. 
## All in the app folder--------------
# (components) -> _client_providers.jsx, MainAppContent.jsx.
# common-> Button.jsx, Input.jsx, Select.jsx.
# FormBuilder -> FromBuilder.jsx, FormField.jsx.
# Sidebars -> LeftSidebar.jsx, RightSidebar.jsx.
# context -> FormContext.js.
# hooks -> useDragAndDrop.js.
# preview -> page.jsx, RenderForm.jsx.
# submitted_data -> page.jsx.
# utils -> initialSchema.js.


