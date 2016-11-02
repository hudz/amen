var $loadCari = jQuery.noConflict();

function openreport(url) {
    window.open(url);
}

function blankInput() {
    elementsForms = document.getElementsByTagName("form");
    if (elementsForms != null) {
        for (var intCounter = 0; intCounter < elementsForms.length; intCounter++) {
            blankInput2(elementsForms[intCounter]);
        }
    }
}

function blankInput2(currentForm) {
    elementsInputs = currentForm.getElementsByTagName("input");
    if (elementsInputs != null) {
        for (var intCounter = 0; intCounter < elementsInputs.length; intCounter++) {
            if (elementsInputs[intCounter].value == 'null') {
                elementsInputs[intCounter].value = '';
            }
        }
    }

}