function checkingSpecialCharacter(input){
    var result = $(input).val();
    console.log(result);
    result = result.replaceAll('&', 'dan');
    result = result.replaceAll(';', ' ');
    result = result.replaceAll(':', ' ');
    result = result.replaceAll('/', ' ');
    result = result.replaceAll('\\', ' ');
    result = result.replaceAll('[', ' ');
    result = result.replaceAll(']', ' ');
    result = result.replaceAll('(', ' ');
    result = result.replaceAll(')', ' ');
    result = result.replaceAll('=', 'sama dengan');
    result = result.replaceAll('?', ' ');
    $(input).val(result);
}