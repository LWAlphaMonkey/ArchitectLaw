var app = new Vue({
    el: '#root',
    data: {
        law_items: {},
        chapter: '',
        letter_item: {},
        showModal: false
    },
    methods: {
        openLetterModal: function(event) {
            var targetId = event.currentTarget.id;
            var url = 'https://crossorigin.me/https://raw.githubusercontent.com/LWAlphaMonkey/ArchitectureLaw/master/src/json/1-1-1.json?alt=media';

            $.getJSON(url, function(data){
                app.letter_item = data;
            });
            this.showModal = true;
        }
    },
    components: {
        'law': {
            template: `
                <div class="row entries">
                    <div class="col-xs-12 col-sm-2">
                        <slot name="title"></slot>
                    </div>
                    <div class="col-xs-12 col-sm-10">
                        <slot name="contents"></slot>
                    </div>
                </div>
            `
        },
        'letter-modal': {
            template: `
                <transition name="modal">
                    <div class="modal-mask">
                        <div class="modal-wrapper">
                            <div class="modal-container">
                                <div class="modal-header">
                                    <slot name="header"></slot>
                                </div>
                                <div class="row entries modal-body">
                                    <div class="col-xs-12 col-sm-3 letter-box">
                                        <slot name="entries"></slot>
                                    </div>
                                    <div class="col-xs-12 col-sm-9 letter-box">
                                        <slot name="contents"></slot>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <slot name="footer">
                                        <button class="modal-default-button" @click="close()">返回</button>
                                    </slot>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>
            `,
            methods: {
                close: function() {
                    this.$emit('close');
                }
            }
        },
        'zap-slideout': {
            template: `
                <div class="zap-slideout" :class="{ isOpen: isOpen }">
                    <div class="zap-slideout-opener" @click="toggle">{{openerText}}</div>
                        <ul class="zap-slideout-menu">
                            <li class="zap-slideout-menu-item" v-for="item in menu">{{item}}</li>
                            <li class="zap-slideout-menu-item--small" v-for="item in smallMenu">{{item}}</li>
                        </ul>
                    </div>
                </div>
            `,
            data: () => ({
                openerText: 'Open',
                isOpen: false,
                menu: [ 'Home', 'Work', 'Contact' ],
                smallMenu: [ 'Tips', 'Resources', 'Shenanigans' ]
            }),
            methods: {
                open() {
                    this.openerText = 'Close';
                    this.isOpen = true;
                },
                close() {
                    this.openerText = 'Open';
                    this.isOpen = false;
                },
                toggle() {
                    if (this.isOpen) {
                        this.close();
                    } else {
                        this.open();
                    }
                }
            }
        }
    }
});

$('.chapter').click(function() {
    //var url = 'https://firebasestorage.googleapis.com/v0/b/buildingtechnicalregulations.appspot.com/o/' + $(this).attr('id') + '.json?alt=media';
    var url = 'json/' + $(this).attr('id') + '.json';
    $.getJSON(url, function(data){
        app.law_items = data.laws;
        app.chapter = data.chapter;
    });
});