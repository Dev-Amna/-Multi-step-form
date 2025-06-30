// buttons and steps
const stepButtons = document.querySelectorAll('.btn');
const formSteps = document.querySelectorAll('.main-form > div');
const nextButtons = document.querySelectorAll('.next-btn');
const backButtons = document.querySelectorAll('.back-btn');
const confirmBtn = document.querySelector('.confirm-btn');
const thankYou = document.querySelector('.step-five');

// Show first 
formSteps[0].style.display = 'block';
for (let i = 1; i < formSteps.length; i++) {
  formSteps[i].style.display = 'none';
}

//  step in sidebar
function highlightStep(stepNum) {
  stepButtons.forEach((btn, idx) => {
    if (idx === stepNum - 1) {
      btn.classList.add('act');
    } else {
      btn.classList.remove('act');
    }
  });
}

// Sidebar step buttons k
stepButtons.forEach((btn, idx) => {
  btn.addEventListener('click', () => {
    formSteps.forEach(step => step.style.display = 'none');
    formSteps[idx].style.display = 'block';
    highlightStep(idx + 1);
  });
});

// STEP 1: 
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');

//  show error 
function showError(input, message) {
  const formGroup = input.parentElement;
  const errorMsg = formGroup.querySelector('.error');
  input.style.borderColor = 'red';
  errorMsg.textContent = message;
  errorMsg.style.display = 'block';
}

// clear error
function clearError(input) {
  const formGroup = input.parentElement;
  const errorMsg = formGroup.querySelector('.error');
  input.style.borderColor = '#ccc';
  errorMsg.style.display = 'none';
}

// Validate email 
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

nextButtons[0].addEventListener('click', () => {
  let isValid = true;
  
  // Validate name
  if (nameInput.value.trim() === '') {
    showError(nameInput, 'This field is required');
    isValid = false;
  } else {
    clearError(nameInput);
  }
  
  // Validate email
  if (emailInput.value.trim() === '') {
    showError(emailInput, 'This field is required');
    isValid = false;
  } else if (!isValidEmail(emailInput.value.trim())) {
    showError(emailInput, 'Please enter a valid email');
    isValid = false;
  } else {
    clearError(emailInput);
  }
  
  // Validate phone
  if (phoneInput.value.trim() === '') {
    showError(phoneInput, 'This field is required');
    isValid = false;
  } else {
    clearError(phoneInput);
  }
  
  //  all fields  valid
  if (isValid) {
    formSteps[0].style.display = 'none';
    formSteps[1].style.display = 'block';
    highlightStep(2);
  }
});

// Clear errors
[nameInput, emailInput, phoneInput].forEach(input => {
  input.addEventListener('input', () => {
    clearError(input);
  });
});

// STEP 2
const plans = document.querySelectorAll('.plan');
const toggle = document.getElementById('billing-toggle');
let selectedPlan = 'arcade';
let isYearly = false;

// Select first plan by default
plans[0].classList.add('selected');

plans.forEach(plan => {
  plan.addEventListener('click', () => {
    // Remove selection from all plans
    plans.forEach(p => p.classList.remove('selected'));
    
    // Add selection to clicked plan
    plan.classList.add('selected');
    selectedPlan = plan.dataset.plan;
  });
});

// Monthly/Yearly toggle
toggle.addEventListener('change', function() {
  isYearly = this.checked;
  
  // Update prices display
  plans.forEach(plan => {
    const priceElement = plan.querySelector('.price');
    if (isYearly) {
      priceElement.textContent = `$${plan.dataset.yearly}/yr`;
    } else {
      priceElement.textContent = `$${plan.dataset.monthly}/mo`;
    }
  });
});

// Next button for step 2
nextButtons[1].addEventListener('click', () => {
  formSteps[1].style.display = 'none';
  formSteps[2].style.display = 'block';
  highlightStep(3);
});

// STEP 3
const addons = document.querySelectorAll('.addon-option input');
const selectedAddons = [];

addons.forEach(addon => {
  addon.addEventListener('change', function() {
    if (this.checked) {
      selectedAddons.push(this.value);
    } else {
      const index = selectedAddons.indexOf(this.value);
      if (index > -1) {
        selectedAddons.splice(index, 1);
      }
    }
  });
});

// Next button for step 3
nextButtons[2].addEventListener('click', () => {
  updateSummary();
  formSteps[2].style.display = 'none';
  formSteps[3].style.display = 'block';
  highlightStep(4);
});

// STEP 4
function updateSummary() {
  const planName = document.querySelector('.selected-plan');
  const planPrice = document.querySelector('.plan-price');
  const addonsList = document.querySelector('.addons-summary');
  const totalPrice = document.querySelector('.total-price');
  
  // Update plan info
  planName.textContent = `${selectedPlan} (${isYearly ? 'Yearly' : 'Monthly'})`;
  planPrice.textContent = isYearly 
    ? `$${document.querySelector('.selected').dataset.yearly}/yr` 
    : `$${document.querySelector('.selected').dataset.monthly}/mo`;
  
  // Update addons
  addonsList.innerHTML = '';
  selectedAddons.forEach(addon => {
    const addonItem = document.createElement('div');
    addonItem.className = 'addon-item';
    addonItem.innerHTML = `<p>${addon}</p><span>+$2/${isYearly ? 'yr' : 'mo'}</span>`;
    addonsList.appendChild(addonItem);
  });
  
  // Update total 
  const basePrice = isYearly 
    ? parseInt(document.querySelector('.selected').dataset.yearly)
    : parseInt(document.querySelector('.selected').dataset.monthly);
  const total = basePrice + (selectedAddons.length * 2);
  
  totalPrice.textContent = `$${total}/${isYearly ? 'yr' : 'mo'}`;
}

// Back buttons
backButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    let currentStep;
    formSteps.forEach((step, idx) => {
      if (step.style.display === 'block') {
        currentStep = idx;
      }
    });
    
    if (currentStep > 0) {
      formSteps[currentStep].style.display = 'none';
      formSteps[currentStep - 1].style.display = 'block';
      highlightStep(currentStep);
    }
  });
});

// Confirm button
confirmBtn.addEventListener('click', () => {
  formSteps.forEach(step => step.style.display = 'none');
  thankYou.style.display = 'flex';
  highlightStep(5);
});