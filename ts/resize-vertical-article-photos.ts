const changeElementStyle = (el: HTMLElement, styleProperty: string, styleValue: string): void => {
    el.style[styleProperty] = styleValue;
}

const setElementWidthAndMargin = (el: HTMLElement, width: string, margin: string): void => {
    changeElementStyle(el, 'width', width);
    changeElementStyle(el, 'margin', margin);
}


const resizeVerticalArticlePhoto = (document: Document): void => {
    //If the lead image has the portrait class...

    if (document.querySelectorAll('div.asset-photo.portrait').length > 0) {
        const leadImageContainer = document.querySelector('div.asset-photo.portrait') as HTMLDivElement;
        const screenWidth = window.innerWidth;

        //Since this function fires on resize, we set the image container's
        //width + margin back to their normal amount if the screen is below 768px wide.

        if (screenWidth < 768) {
            setElementWidthAndMargin(leadImageContainer, '100%', '0 0 30px 0');
        }

        //If the screen width is 768px or above...

        if (screenWidth >= 768 && screenWidth < 1000) {

            //Change its width to 45%
            //Change its margin to 0 25%
            setElementWidthAndMargin(leadImageContainer, '45%', '0 25% 30px');
        }

        //If the screen width is 1000px or above...

        else if (screenWidth >= 1000 && screenWidth < 1300) {

            //Change its width to 45%
            //Change its margin to 0 27.5%
            setElementWidthAndMargin(leadImageContainer, '45%', '0 27.5% 30px');

        }
        //If the screen width is 1300px or above...

        else if (screenWidth >= 1300 && screenWidth < 1700) {

            //Change its width to 35%
            //Change its margin to 0 34%
            setElementWidthAndMargin(leadImageContainer, '35%', '0 34% 30px');
        }

        //If the screen width is 1700px or above...
        else if (screenWidth >= 1700 && screenWidth < 2100) {
            //Change its width to 30%
            //Change its margin to 1em 36.5%
            setElementWidthAndMargin(leadImageContainer, '30%', '0 36.5% 30px');
        }

        //If the screen width is 2100px or above...

        else if (screenWidth >= 2100) {

            //Change its width to 25%
            //Change its margin to 1em 39%
            setElementWidthAndMargin(leadImageContainer, '25%', '0 39% 30px');
        }
    }

}

resizeVerticalArticlePhoto(document);

window.addEventListener('resize', (): void => {
    resizeVerticalArticlePhoto(document);
})

