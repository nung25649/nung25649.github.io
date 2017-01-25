$(document).ready(function () {
    $("#nanoGallery1").nanoGallery({
        kind: 'flickr',
        userID: '139896585@N06',
        displayBreadcrumb: true,
        thumbnailWidth: 'auto',
        thumbnailHeight: 300,
        thumbnailHoverEffect: 'labelAppear75, labelOpacity50',
        colorScheme: 'light',
        thumbnailLabel:{ position: 'overImageOnMiddle', hideIcons: true, align: 'center'}
    });
});