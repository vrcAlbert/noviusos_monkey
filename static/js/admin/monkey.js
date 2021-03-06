/**
 * NOVIUS OS - Web OS for digital communication
 *
 * @copyright  2011 Novius
 * @license    GNU Affero General Public License v3 or (at your option) any later version
 *             http://www.gnu.org/licenses/agpl-3.0.html
 * @link http://www.novius-os.org
 */

define([
    'jquery-nos'
], function($) {
    return function(appDesk) {
        return {
            tab : {
                label : appDesk.i18n('Monkey'),
                iconUrl : 'static/apps/noviusos_monkey/img/32/monkey.png'
            },
            actions : {
                update : {
                    action : function(item, ui) {
                        $(ui).nosTabs({
                            url     : "admin/noviusos_monkey/monkey/insert_update/" + item.id,
                            label   : appDesk.i18n('Edit')._()
                        });
                    },
                    label : appDesk.i18n('Edit'),
                    name : 'edit',
                    primary : true,
                    icon : 'pencil'
                },
                'delete' : {
                    action : function(item, ui) {
                        $.appDesk = appDesk;
                        $(ui).nosConfirmationDialog({
                            contentUrl: 'admin/noviusos_monkey/monkey/delete/' + item.id,
                            title: appDesk.i18n('Delete a monkey')._(),
                            confirmed: function($dialog) {
                                $dialog.nosAjax({
                                    url : 'admin/noviusos_monkey/monkey/delete_confirm',
                                    method : 'POST',
                                    data : $dialog.find('form').serialize()
                                });
                            },
                            appDesk: appDesk
                        });
                    },
                    label : appDesk.i18n('Delete'),
                    name : 'delete',
                    primary : true,
                    icon : 'trash'
                },
                'visualise' : {
                    label : 'Visualise',
                    name : 'visualise',
                    primary : true,
                    iconClasses : 'nos-icon16 nos-icon16-eye',
                    action : function(item) {
                        window.open(item.url + '?_preview=1');
                    }
                }
            },
            reloadEvent : 'Nos\\Monkey\\Model_Monkey',
            appdesk : {
                adds : {
                    monkey : {
                        label : appDesk.i18n('Add a monkey'),
                        action : function(ui, appdesk) {
                            $(ui).nosTabs('add', {
                                url     : 'admin/noviusos_monkey/monkey/insert_update?lang=' + appdesk.lang,
                                label   : appDesk.i18n('Add a new monkey')._()
                            });
                        }
                    },
                    species : {
                        label : appDesk.i18n('Add a species'),
                        action : function(ui, appdesk) {
                            $(ui).nosTabs({
                                url: 'admin/noviusos_monkey/species/insert_update?lang=' + appdesk.lang,
                                label: 'Add a species'
                            });
                        }
                    }
                },
                splittersVertical :  250,
                grid : {
                    proxyUrl : 'admin/noviusos_monkey/appdesk/json',
                    columns : {
                        name : {
                            headerText : appDesk.i18n('Name'),
                            dataKey : 'name'
                        },
                        lang : {
                            lang : true
                        },
                        species : {
                            headerText : appDesk.i18n('Species'),
                            dataKey : 'species'
                        },
                        published : {
                            headerText : appDesk.i18n('Status'),
                            dataKey : 'publication_status'
                        },
                        actions : {
                            actions : ['update', 'delete', 'visualise']
                        }
                    }
                },
                inspectors : {
                    speciess : {
                        reloadEvent : 'Nos\\Monkey\\Model_Species',
                        label : appDesk.i18n('Speciess'),
                        url : 'admin/noviusos_monkey/inspector/species/list',
                        grid : {
                            columns : {
                                title : {
                                    headerText : appDesk.i18n('Species'),
                                    dataKey : 'title'
                                },
                                actions : {
                                    showOnlyArrow : true,
                                    actions : [
                                        {
                                            action : function(item, ui) {
                                                $(ui).nosTabs({
                                                    url     : "admin/noviusos_monkey/species/insert_update/" + item.id,
                                                    label   : appDesk.i18n('Edit')._()
                                                });
                                            },
                                            label : appDesk.i18n('Edit'),
                                            name : 'edit',
                                            primary : true,
                                            icon : 'pencil'
                                        },
                                        {
                                            action : function(item, ui) {
                                                $(ui).nosConfirmationDialog({
                                                    contentUrl: 'admin/noviusos_monkey/species/delete/' + item.id,
                                                    title: appDesk.i18n('Delete a species')._(),
                                                    confirmed: function($dialog) {
                                                        $dialog.nosAjax({
                                                            url : 'admin/noviusos_monkey/species/delete_confirm',
                                                            method : 'POST',
                                                            data : $dialog.find('form').serialize()
                                                        });
                                                    }
                                                });
                                            },
                                            label : appDesk.i18n('Delete'),
                                            name : 'delete',
                                            primary : true,
                                            icon : 'trash'
                                        }
                                    ]
                                }

                            },
                            urlJson : 'admin/noviusos_monkey/inspector/species/json'
                        },
                        inputName : 'monk_species_id[]',
                        vertical : true
                    }
                }
            }
        }
    }
});
