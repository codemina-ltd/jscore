/**
 * CodeMina base code
 * @author Ibrahim Haj
 * @constructor
 */
const CodeMina = function () {

    let uiHelperCodebase = function () {
        if (typeof Codebase === 'undefined') {
            return
        }
        
        Codebase.helpers(['core-custom-file-input', 'select2', 'datepicker', 'summernote', 'table-tools', 'simplemde', 'magnific-popup', 'ckeditor', 'core-tooltip', 'core-popover']);
    };

    let uiHelperDataTable = function () {
        jQuery('.js-dataTable:not(.dataTable)').each(function () {
            $(this).dataTable({
                pageLength: 10,
                lengthMenu: [[10, 15, 20, 50, 100, 500, -1], [10, 15, 20, 50, 100, 500, 'All']],
                autoWidth: false,
                scrollX: $(this).data('scroll'),
                order: [],
                columnDefs: [
                    {targets: 'no-sort', orderable: false},
                    {targets: 'not-visible', visible: false}
                ]
            });
        });
    };

    let uiHelperNumeric = function () {
        jQuery('.js-numeric:not(.js-numeric-enabled)').each(function () {
            if (typeof AutoNumeric === 'undefined') {
                return;
            }

            new AutoNumeric(this, {
                currencySymbol: '$',
                emptyInputBehavior: 'always',
                modifyValueOnWheel: false,
            });

            jQuery(this).addClass('js-numeric-enabled');
        });

        jQuery('.js-numbers-only:not(.js-numbers-only-enabled)').each(function() {
            $(this)
                .addClass('js-numbers-only-enabled')
                .numeric({
                    negative: false,
                });
        });
    };

    let uiHelperMultiSelect = function () {
        jQuery('.js-multiselect:not(.js-multiselect-enabled)').each(function() {
            $(this).multiSelect({
                selectableHeader: "<input type='text' class='form-control' autocomplete='off' placeholder='Search' style='margin-bottom: 10px'>",
                selectionHeader: "<input type='text' class='form-control' autocomplete='off' placeholder='Search selected' style='margin-bottom: 10px'>",
                afterInit: function(ms){
                    let that = this,
                        $selectableSearch = that.$selectableUl.prev(),
                        $selectionSearch = that.$selectionUl.prev(),
                        selectableSearchString = '#'+that.$container.attr('id')+' .ms-elem-selectable:not(.ms-selected)',
                        selectionSearchString = '#'+that.$container.attr('id')+' .ms-elem-selection.ms-selected';

                    that.qs1 = $selectableSearch.quicksearch(selectableSearchString)
                        .on('keydown', function(e){
                            if (e.which === 40){
                                that.$selectableUl.focus();
                                return false;
                            }
                        });

                    that.qs2 = $selectionSearch.quicksearch(selectionSearchString)
                        .on('keydown', function(e){
                            if (e.which === 40){
                                that.$selectionUl.focus();
                                return false;
                            }
                        });
                },
                afterSelect: function(){
                    this.qs1.cache();
                    this.qs2.cache();
                },
                afterDeselect: function(){
                    this.qs1.cache();
                    this.qs2.cache();
                },
            });
        });
    };

    let uiHelperTinyMCE = function () {
        if (typeof tinymce === 'undefined') {
            return;
        }

        tinymce.EditorManager.editors = [];

        tinymce.init({
            selector: '.js-tinyMCE',
            menubar: false,
            statusbar: false,
            theme: 'modern',
            image_advtab: true,
            height: 150,
            width: '99%',
            resize: false,
            plugins: [
                'advlist autolink lists link image charmap print preview hr anchor pagebreak',
                'searchreplace wordcount visualblocks visualchars code fullscreen',
                'insertdatetime media nonbreaking save table contextmenu directionality',
                'emoticons template paste textcolor colorpicker textpattern imagetools'
            ],
            toolbar1: 'styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist',
            setup: function (editor) {
                editor.on('change', function () {
                    editor.save();
                })
            }
        });

        tinymce.init({
            selector: '.js-tinyMCE-full',
            menubar: false,
            statusbar: false,
            theme: 'modern',
            image_advtab: true,
            height: 150,
            width: '99%',
            resize: false,
            plugins: [
                'advlist autolink lists link image charmap print preview hr anchor pagebreak',
                'searchreplace wordcount visualblocks visualchars code fullscreen',
                'insertdatetime media nonbreaking save table contextmenu directionality',
                'emoticons template paste textcolor colorpicker textpattern imagetools'
            ],
            toolbar1: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media',
            toolbar2: 'preview | forecolor backcolor | code table',
            setup: function (editor) {
                editor.on('change', function () {
                    editor.save();
                })
            }
        });
    };

    let uiHelperTimePicker = function () {
        jQuery('.js-timepicker:not(.js-timepicker-enabled)').each(function() {
            $(this)
                .addClass('js-timepicker-enabled')
                .timepicker();
        });
    };

    let uiHelperDisableAutoComplete = function () {
        jQuery('.js-timepicker, .js-datepicker').prop('autocomplete', 'off');
    };

    let uiHelperContactTable = function () {
        let $table = jQuery('.js-contacts:not(.js-contacts-enabled)')
            .addClass('js-contacts-enabled');

        if ($table.length > 0) {
            let data = [['', '', '', '', '']];
            if (!!$table.data('data')) {
                data = JSON.parse($table.data('data'));
            }
            let table = jexcel($table[0], {
                data: data,
                columns: [
                    {type: 'dropdown', title: 'Title', source: ["Mr", "Mrs", "Miss", "Ms", "Dr", "Prof", "Eng"]},
                    {type: 'text', title: 'First Name',},
                    {type: 'text', title: 'Last Name',},
                    {type: 'text', title: 'Phone',},
                    {type: 'text', title: 'Email'},
                    {type: 'hidden', title: 'id'},
                ],
                allowInsertColumn: false,
            });

            let styling = function() {
                let style = {};
                table.rows.forEach(function (row, index) {
                    let i = index + 1;

                    style['A' + i] = 'text-align: left;';
                    style['B' + i] = 'text-align: left;';
                    style['C' + i] = 'text-align: left;';
                    style['D' + i] = 'text-align: left;';
                    style['E' + i] = 'text-align: left;';
                });
                table.setStyle(style);
            };

            styling();

            jQuery('.contact-action').on('click', function () {
                let data = jQuery(this).data();
                switch (data.action) {
                    case 'add-row':
                        table.insertRow();
                        styling();
                        break;
                    case 'delete-last':
                        if (table.rows.length === 1) {
                            table.insertRow();
                            table.deleteRow(0, 1)
                        } else {
                            table.deleteRow();
                        }
                        break;
                    case 'get-json':
                        console.log(table.getJson());
                        break;
                }
            });
        }
    };

    return {
        init: function () {

        },
        /**
         *
         * @param helper
         */
        helper: function (helper) {
            switch (helper) {
                case 'all':
                    uiHelperCodebase();
                    uiHelperDataTable();
                    uiHelperNumeric();
                    uiHelperTinyMCE();
                    uiHelperTimePicker();
                    uiHelperDisableAutoComplete();
                    uiHelperMultiSelect();
                    uiHelperContactTable();
                    break;
                case 'codebase':
                    uiHelperCodebase();
                    break;
                case 'datatables':
                    uiHelperDataTable();
                    break;
                case 'numeric':
                    uiHelperNumeric();
                    break;
                case 'tinymce':
                    uiHelperTinyMCE();
                    break;
                case 'timepicker':
                    uiHelperTimePicker();
                    break;
                case 'multiselect':
                    uiHelperMultiSelect();
                    break;
                case 'contacts':
                    uiHelperContactTable();
                    break;
            }
        },
        /**
         *
         * @param helpers
         */
        helpers: function (helpers) {
            if (helpers instanceof Array) {
                for (let index in helpers) {
                    CodeMina.helper(helpers[index]);
                }
            } else {
                CodeMina.helper(helpers);
            }
        },
        /**
         *
         * @returns {jQuery|string|undefined}
         */
        baseUrl: function () {
            return jQuery('#CM_baseUrl').val();
        },
        /**
         *
         * @param id
         * @returns {jQuery|string|undefined}
         */
        getValue: function (id) {
            let $config = jQuery(`#CM_${id}`);
            if ($config.length === 0) {
                console.error('#CM_' + id + ' element is not found!');
                return;
            }
            return $config.val();
        },
        /**
         *
         * @returns {jQuery|string}
         */
        isMobile: function() {
            return CodeMina.getValue('IS_SCROLLABLE');
        },
        /**
         *
         * @returns {jQuery|string|undefined}
         */
        csrf: function () {
            return jQuery('#CM_YII_CSRF_TOKEN').val();
        },
        /**
         *
         * @returns {string}
         */
        random: function () {
            let text = "";
            const possible = "abcdefghijklmnopqrstuvwxyz0123456789";

            for (let i = 0; i < 5; i++) {
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            return text;
        },
        /**
         *
         * @param num
         * @returns {string}
         */
        format: function (num) {
            return !!num ? num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : '0.00';
        },
        /**
         * Load DT
         * @param table
         * @param helpers
         */
        load: function (table, helpers = true) {
            let $container = jQuery('#' + table + '-table');
            let $block = $container.closest('.block');

            Codebase.blocks($block, 'state_toggle');

            $container.load(CodeMina.baseUrl() + '/site/getTable', {table: table, YII_CSRF_TOKEN: CodeMina.csrf()}, function (response) {
                if (helpers) {
                    CodeMina.helpers(['all']);
                    Codebase.blocks($block, 'state_toggle');
                }
            });
        },
        /**
         *
         * @param table
         */
        refresh: function (table = null) {
            jQuery(table == null ? (CodeMina.isMobile() ? '.dataTables_scrollBody table.dataTable' : 'table.dataTable') : table).each(function () {
                if (jQuery(this).dataTable().api().settings()[0].oFeatures.bServerSide) {
                    jQuery(this).dataTable().DataTable().ajax.reload(null, false);
                }
            });
        },
        /**
         *
         * @param title
         * @returns {[{extend: string, exportOptions: {columns: string}, footer: boolean, text: string}]}
         */
        defaultButtons: function (title = '') {
            let buttons = [
                {
                    extend: 'print',
                    text: `<i class="fa fa-print"></i> ${t('Print')}`,
                    exportOptions: {
                        columns: 'thead th:not(.no-export)'
                    },
                    footer: true
                }
            ];

            if (!!title) {
                for (let button of buttons) {
                    button['title'] = title;
                }
            }

            return buttons;
        },
        /**
         *
         * @param settings
         */
        drawCallback: function (settings) {
            if (jQuery(settings.nTableWrapper).hasClass('dt-new-wrapper')) {
                return;
            }

            jQuery(settings.nTableWrapper)
                .addClass('dt-new-wrapper')
                .find('.dataTables_length')
                .append(jQuery(settings.nTableWrapper).find('.dt-buttons'))
                .append(jQuery(settings.nTableWrapper).find('.dataTables_filter'));
        },
        rates: {
            /**
             *
             * @param base
             * @param currency
             * @param amount
             * @returns {number}
             */
            calculate: function (base, currency, amount) {
                let euro = amount / exchangeRates.rates[base];
                let rate = exchangeRates.rates[currency];

                return euro * rate;
            }
        }
    }
}();